package com.cloudshare.service;

import com.cloudshare.dto.FileMetaDataDTO;
import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.entity.FileMetadata;
import com.cloudshare.entity.User;
import com.cloudshare.exception.AccessDeniedException;
import com.cloudshare.exception.ResourceNotFoundException;
import com.cloudshare.repository.FileMetadataRepository;
import com.cloudshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileMetaDataService {

    private final UserCreditsService userCreditsService;
    private final FileMetadataRepository fileMetadataRepository;
    private final ProfileService profileService;
    private final UserRepository userRepository;
    private final S3Service s3Service;

    public List<FileMetaDataDTO> uploadFiles(MultipartFile[] files) throws IOException {
        List<FileMetaDataDTO> fileMetaDataList = new ArrayList<>();

        // Check if user has enough credits
        if (!userCreditsService.hasEnoughCredits(files.length)) {
            throw new RuntimeException("Not enough credits to upload files.");
        }

        // Get current user
        ProfileDTO currentProfile = profileService.getCurrentProfile();

        User user = userRepository.findByClerkId(currentProfile.getClerkId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found for clerkId: " + currentProfile.getClerkId()
                ));

        // Upload each file to S3
        for (MultipartFile file : files) {

            String rawExtension = StringUtils.getFilenameExtension(
                    file.getOriginalFilename()
            );

            // Sanitize extension to ensure it only contains alphanumeric characters
            String extension = rawExtension != null ? rawExtension.replaceAll("[^a-zA-Z0-9]", "") : null;

            String storageKey = UUID.randomUUID()
                    + (extension != null && !extension.isEmpty() ? "." + extension : "");

            // Get file type safely
            String fileType = file.getContentType();

            if (fileType == null) {
                fileType = "application/octet-stream";
            }

            // Save actual file to AWS S3
            s3Service.uploadFile(
                    storageKey,
                    file.getInputStream(),
                    file.getSize(),
                    fileType
            );

            // Create metadata
            FileMetadata fileMetadata = FileMetadata.builder()
                    // Original filename shown to the user
                    .fileName(file.getOriginalFilename())

                    .fileType(fileType)
                    .fileSize(file.getSize())
                    .isPublic(false)

                    // Generated filename/key used for S3 object storage
                    .storageKey(storageKey)

                    .user(user)
                    .build();

            // Consume one credit
            userCreditsService.consumeCredit();

            // Save metadata
            FileMetadata savedFile =
                    fileMetadataRepository.save(fileMetadata);

            // Convert Entity to DTO
            fileMetaDataList.add(mapToDTO(savedFile));
        }

        return fileMetaDataList;
    }

    private FileMetaDataDTO mapToDTO(FileMetadata fileMetadata) {

        return FileMetaDataDTO.builder()
                .id(fileMetadata.getId())
                .fileName(fileMetadata.getFileName())
                .fileType(fileMetadata.getFileType())
                .fileSize(fileMetadata.getFileSize())
                .isPublic(fileMetadata.getIsPublic())
                .uploadedAt(fileMetadata.getUploadedAt())
                .storageKey(fileMetadata.getStorageKey())
                .build();
    }

    public List<FileMetaDataDTO> getFiles() {

        // Get current logged-in profile
        ProfileDTO currentProfile = profileService.getCurrentProfile();

        // Find User using Clerk ID
        User user = userRepository.findByClerkId(currentProfile.getClerkId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found for clerkId: "
                                + currentProfile.getClerkId()
                ));

        // Find files belonging to this user
        List<FileMetadata> files =
                fileMetadataRepository.findByUser(user);

        // Convert Entity list to DTO list
        return files.stream()
                .map(this::mapToDTO)
                .toList();
    }

    public FileMetaDataDTO getPublicFile(Long id) {

        FileMetadata file = fileMetadataRepository.findById(id)
                .filter(FileMetadata::getIsPublic)
                .orElseThrow(() ->
                        new ResourceNotFoundException("File not found or is not public")
                );

        return mapToDTO(file);
    }

    public FileMetaDataDTO getDownloadableFile(Long id) {

        FileMetadata file = fileMetadataRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("File not found")
                );

        // Public files can be downloaded by anyone
        if (Boolean.TRUE.equals(file.getIsPublic())) {
            return mapToDTO(file);
        }

        // Private files can only be downloaded by their owner
        var authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {

            throw new AccessDeniedException(
                    "You do not have permission to download this file"
            );
        }

        ProfileDTO currentProfile =
                profileService.getCurrentProfile();

        if (!file.getUser().getClerkId()
                .equals(currentProfile.getClerkId())) {

            throw new AccessDeniedException(
                    "You do not have permission to download this file"
            );
        }

        return mapToDTO(file);
    }

    @Transactional
    public void deleteFile(Long id) {

        ProfileDTO currentProfile =
                profileService.getCurrentProfile();

        FileMetadata file =
                fileMetadataRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("File not found")
                        );

        // Only the owner can delete the file
        if (!file.getUser().getClerkId()
                .equals(currentProfile.getClerkId())) {

            throw new AccessDeniedException(
                    "File does not belong to current user"
            );
        }

        // Delete metadata from database first
        fileMetadataRepository.delete(file);
        fileMetadataRepository.flush();

        // Delete actual file from AWS S3 after DB delete succeeds
        try {
            s3Service.deleteFile(file.getStorageKey());
        } catch (Exception e) {
            // Log but don't fail — DB record is already deleted
            System.err.println("Warning: Could not delete file from S3: " + e.getMessage());
        }
    }

    public FileMetaDataDTO updateVisibility(
            Long id,
            Boolean isPublic
    ) {

        ProfileDTO currentProfile =
                profileService.getCurrentProfile();

        FileMetadata file =
                fileMetadataRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("File not found")
                        );

        // Only the owner can change visibility
        if (!file.getUser().getClerkId()
                .equals(currentProfile.getClerkId())) {

            throw new AccessDeniedException(
                    "You do not have permission to modify this file"
            );
        }

        file.setIsPublic(isPublic);

        FileMetadata updatedFile =
                fileMetadataRepository.save(file);

        return mapToDTO(updatedFile);
    }
}
