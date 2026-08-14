package com.cloudshare.service;

import com.cloudshare.dto.FileMetaDataDTO;
import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.entity.FileMetadata;
import com.cloudshare.repository.FileMetaDataRepository;
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

    private final ProfileService profileService;
    private final UserCreditsService userCreditsService;
    private final FileMetaDataRepository fileMetaDataRepository;

    public List<FileMetaDataDTO> uploadFiles(MultipartFile[] files) throws IOException {

        ProfileDTO currentProfile = profileService.getCurrentProfile();

        List<FileMetaDataDTO> fileMetaDataList = new ArrayList<>();

        if (!userCreditsService.hasEnoughCredits(files.length)) {
            throw new RuntimeException("Not enough credits to upload files.");
        }

        Path uploadPath = Path.of("uploads")
                .toAbsolutePath()
                .normalize();

        Files.createDirectories(uploadPath);

        for (MultipartFile file : files) {

            String fileName = UUID.randomUUID() +"."+ StringUtils.getFilenameExtension(file.getOriginalFilename());
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            FileMetadata fileMetadata = FileMetadata.builder()
                    .fileLocation(targetLocation.toString())
                    .fileName(fileName)
                    .fileType(file.getContentType())
                    .clerkId(currentProfile.getClerkId())
                    .fileSize(file.getSize())
                    .isPublic(false)
                    .uploadedAt(java.time.Instant.now())
                    .storageKey(fileName)
                    .build();

            userCreditsService.consumeCredit();

            FileMetadata savedFile =
                    fileMetaDataRepository.save(fileMetadata);

            fileMetaDataList.add(mapToDTO(savedFile));
        }

        return fileMetaDataList;
    }

    private FileMetaDataDTO mapToDTO(FileMetadata fileMetadata) {

        return FileMetaDataDTO.builder()
                .id(fileMetadata.getId())
                .fileLocation(fileMetadata.getFileLocation())
                .fileName(fileMetadata.getFileName())
                .fileType(fileMetadata.getFileType())
                .clerkId(fileMetadata.getClerkId())
                .fileSize(fileMetadata.getFileSize())
                .isPublic(fileMetadata.getIsPublic())
                .uploadedAt(fileMetadata.getUploadedAt())
                .storageKey(fileMetadata.getStorageKey())
                .build();
    }
}