package com.cloudshare.service;

import com.cloudshare.dto.FileMetaDataDTO;
import com.cloudshare.entity.FileMetadata;
import com.cloudshare.repository.FileMetadataRepository;
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

    public List<FileMetaDataDTO> uploadFiles(MultipartFile[] files) throws IOException {

        List<FileMetaDataDTO> fileMetaDataList = new ArrayList<>();

        if (!userCreditsService.hasEnoughCredits(files.length)) {
            throw new RuntimeException("Not enough credits to upload files.");
        }

        Path uploadPath = Path.of("uploads")
                .toAbsolutePath()
                .normalize();

        Files.createDirectories(uploadPath);

        for (MultipartFile file : files) {

            String fileName = UUID.randomUUID() + "." + StringUtils.getFilenameExtension(file.getOriginalFilename());
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            FileMetadata fileMetadata = FileMetadata.builder()
                    .fileName(fileName)
                    .fileType(file.getContentType())
                    .fileSize(file.getSize())
                    .isPublic(false)
                    .storageKey(fileName)
                    .build();

            userCreditsService.consumeCredit();

            FileMetadata savedFile = fileMetadataRepository.save(fileMetadata);

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
}