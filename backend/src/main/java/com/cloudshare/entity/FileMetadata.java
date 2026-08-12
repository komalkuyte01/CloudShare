package com.cloudshare.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "file_metadata", indexes = {
        @Index(name = "idx_file_user_id", columnList = "user_id"),
        @Index(name = "idx_file_is_public", columnList = "is_public")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;       // original file name

    @Column(nullable = false)
    private String fileType;       // MIME type e.g. "image/png"

    @Column(nullable = false)
    private Long fileSize;         // size in bytes

    @Column(nullable = false)
    private String storageKey;     // path/key in your storage system

    @Builder.Default
    @Column(nullable = false, name = "is_public")
    private Boolean isPublic = false; // toggle private/public visibility

    @Column(nullable = false, updatable = false)
    private Instant uploadedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;             // FK → users.id

    @PrePersist
    public void prePersist() {
        uploadedAt = Instant.now();
    }
}
