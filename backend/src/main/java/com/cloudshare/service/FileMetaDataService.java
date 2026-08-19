package com.cloudshare.service;

import com.cloudshare.dto.FileMetaDataDTO;
import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.entity.FileMetadata;
import com.cloudshare.entity.User;
import com.cloudshare.repository.FileMetadataRepository;
import com.cloudshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
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

    public List<FileMetaDataDTO> uploadFiles(MultipartFile[] files) throws IOException {

        List<FileMetaDataDTO> fileMetaDataList = new ArrayList<>();

        // Check if user has enough credits
        if (!userCreditsService.hasEnoughCredits(files.length)) {
            throw new RuntimeException("Not enough credits to upload files.");
        }

        // Get current user
        ProfileDTO currentProfile = profileService.getCurrentProfile();

        User user = userRepository.findByClerkId(currentProfile.getClerkId())
                .orElseThrow(() -> new RuntimeException(
                        "User not found for clerkId: " + currentProfile.getClerkId()
                ));

        // Create uploads directory
        Path uploadPath = Path.of("uploads")
                .toAbsolutePath()
                .normalize();

        Files.createDirectories(uploadPath);

        // Upload each file
        for (MultipartFile file : files) {

            String extension = StringUtils.getFilenameExtension(
                    file.getOriginalFilename()
            );

            String fileName = UUID.randomUUID()
                    + (extension != null ? "." + extension : "");

            Path targetLocation = uploadPath.resolve(fileName);

            // Save actual file
            Files.copy(
                    file.getInputStream(),
                    targetLocation,
                    StandardCopyOption.REPLACE_EXISTING
            );

            // Create metadata
            FileMetadata fileMetadata = FileMetadata.builder()
                    .fileName(fileName)
                    .fileType(file.getContentType())
                    .fileSize(file.getSize())
                    .isPublic(false)
                    .storageKey(fileName)
                    .user(user)
                    .build();

            // Consume credit
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
                .orElseThrow(() -> new RuntimeException(
                        "User not found for clerkId: "
                                + currentProfile.getClerkId()
                ));

        // Find files belonging to this user
        List<FileMetadata> files = fileMetadataRepository.findByUser(user);

        // Convert Entity list to DTO list
        return files.stream()
                .map(this::mapToDTO)
                .toList();
    }

    public FileMetaDataDTO getPublicFile(Long id) {
        FileMetadata file = fileMetadataRepository.findById(id)
                .filter(FileMetadata::getIsPublic)
                .orElseThrow(() -> new RuntimeException("Unable to get the file"));
        return mapToDTO(file);
    }
    public FileMetaDataDTO getDownloadableFile(Long id) {
        FileMetadata file = fileMetadataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));
        return mapToDTO(file);
    }

    public void deleteFile(Long id) {
        try {
            ProfileDTO currentProfile = profileService.getCurrentProfile();
            FileMetadata file = fileMetadataRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("File not found"));

            if (!file.getUser().getClerkId().equals(currentProfile.getClerkId())) {
                throw new RuntimeException("File does not belong to current user");
            }

            Path filePath = Path.of("uploads")
                    .toAbsolutePath()
                    .normalize()
                    .resolve(file.getStorageKey());
            Files.deleteIfExists(filePath);
            fileMetadataRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting file: " + e.getMessage());
        }
    }

    public FileMetaDataDTO updateVisibility(Long id, Boolean isPublic) {

        ProfileDTO currentProfile = profileService.getCurrentProfile();

        FileMetadata file = fileMetadataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (!file.getUser().getClerkId().equals(currentProfile.getClerkId())) {
            throw new RuntimeException("You do not have permission to modify this file");
        }

        file.setIsPublic(isPublic);
        FileMetadata updatedFile = fileMetadataRepository.save(file);

        return mapToDTO(updatedFile);
    }


}