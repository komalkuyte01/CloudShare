package com.cloudshare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileMetaDataDTO {

    private Long id;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private Boolean isPublic;
    private Instant uploadedAt;
    private String storageKey;
}