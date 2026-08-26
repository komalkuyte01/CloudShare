package com.cloudshare.controller;

import com.cloudshare.dto.FileMetaDataDTO;
import com.cloudshare.entity.UserCredits;
import com.cloudshare.service.FileMetaDataService;
import com.cloudshare.service.UserCreditsService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {

    private final FileMetaDataService fileMetaDataService;
    private final UserCreditsService userCreditsService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFiles(@RequestPart("files") MultipartFile[] files) throws IOException {
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

            Path path = com.cloudshare.util.StorageUtils.getUploadsPath()
                    .resolve(downloadableFile.getStorageKey());

            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
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
