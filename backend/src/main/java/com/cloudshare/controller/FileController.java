package com.cloudshare.controller;

import com.cloudshare.dto.FileMetaDataDTO;
import com.cloudshare.entity.UserCredits;
import com.cloudshare.service.FileMetaDataService;
import com.cloudshare.service.UserCreditsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
}
