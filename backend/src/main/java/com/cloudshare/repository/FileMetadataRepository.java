package com.cloudshare.repository;

import com.cloudshare.entity.FileMetadata;
import com.cloudshare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileMetadataRepository extends JpaRepository<FileMetadata, Long> {

    List<FileMetadata> findByUser(User user);

    List<FileMetadata> findByUserAndIsPublic(User user, Boolean isPublic);
}
