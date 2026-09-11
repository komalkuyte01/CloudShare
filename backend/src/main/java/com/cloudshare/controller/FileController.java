package com.cloudshare.controller;

import com.cloudshare.dto.FileMetaDataDTO;
import com.cloudshare.entity.UserCredits;
import com.cloudshare.service.FileMetaDataService;
import com.cloudshare.service.S3Service;
import com.cloudshare.service.UserCreditsService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {

    private final FileMetaDataService fileMetaDataService;
    private final UserCreditsService userCreditsService;
    private final S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(
            @RequestParam(value = "files", required = false) MultipartFile[] paramFiles,
            @RequestPart(value = "files", required = false) MultipartFile[] partFiles) throws IOException {

        MultipartFile[] files = (paramFiles != null && paramFiles.length > 0) ? paramFiles : partFiles;

        if (files == null || files.length == 0) {
            return ResponseEntity.badRequest().body(Map.of("message", "No files provided for upload"));
        }
        Map<String, Object> response = new HashMap<>();
        List<FileMetaDataDTO> list = fileMetaDataService.uploadFiles(files);
        UserCredits finalCredits = userCreditsService.getUserCreditsById();
        response.put("files", list);
        response.put("remainingCredits", finalCredits.getCredits());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/my")
    public ResponseEntity<?> getFilesForCurrentUser() {
      List<FileMetaDataDTO> files = fileMetaDataService.getFiles();
      return ResponseEntity.ok(files);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<?> getPublicFile(@PathVariable Long id) {
        FileMetaDataDTO file = fileMetaDataService.getPublicFile(id);
        return ResponseEntity.ok(file);
    }
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        try {
            FileMetaDataDTO downloadableFile = fileMetaDataService.getDownloadableFile(id);

            ResponseInputStream<GetObjectResponse> s3Stream =
                    s3Service.downloadFile(downloadableFile.getStorageKey());

            InputStreamResource resource = new InputStreamResource(s3Stream);

            MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
            if (downloadableFile.getFileType() != null) {
                try {
                    mediaType = MediaType.parseMediaType(downloadableFile.getFileType());
                } catch (Exception ignored) {}
            }

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + downloadableFile.getFileName() + "\"")
                    .body(resource);
        } catch (Exception e) {
            throw new RuntimeException("Error downloading file: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id) {
        fileMetaDataService.deleteFile(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/visibility")
    public ResponseEntity<?> updateVisibility(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        if (!body.containsKey("isPublic") || !(body.get("isPublic") instanceof Boolean)) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Request body must contain 'isPublic' as a boolean value")
            );
        }

        Boolean isPublic = (Boolean) body.get("isPublic");
        FileMetaDataDTO updatedFile = fileMetaDataService.updateVisibility(id, isPublic);

        return ResponseEntity.ok(updatedFile);
    }
}
