package com.cloudshare.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(
        name = "file_metadata",
        indexes = {
                @Index(
                        name = "idx_file_metadata_user_id",
                        columnList = "user_id"
                ),
                @Index(
                        name = "idx_file_metadata_is_public",
                        columnList = "is_public"
                ),
                @Index(
                        name = "idx_file_metadata_user_public",
                        columnList = "user_id, is_public"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Original name of the uploaded file.
     */
    @Column(
            name = "file_name",
            nullable = false,
            length = 255
    )
    private String fileName;

    /**
     * MIME type of the file.
     * Example: image/png, application/pdf
     */
    @Column(
            name = "file_type",
            nullable = false,
            length = 100
    )
    private String fileType;

    /**
     * File size in bytes.
     */
    @Column(
            name = "file_size",
            nullable = false
    )
    private Long fileSize;

    /**
     * Unique key/path used to locate the file
     * in the actual storage system (e.g. AWS S3).
     */
    @Column(
            name = "storage_key",
            nullable = false,
            unique = true,
            length = 500
    )
    private String storageKey;

    /**
     * Controls whether the file is publicly accessible.
     * false = private
     * true  = public
     */
    @Builder.Default
    @Column(
            name = "is_public",
            nullable = false
    )
    private Boolean isPublic = false;

    /**
     * Time when the file was uploaded.
     */
    @Column(
            name = "uploaded_at",
            nullable = false,
            updatable = false
    )
    private Instant uploadedAt;

    /**
     * Owner of the file.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    @PrePersist
    protected void onCreate() {
        if (uploadedAt == null) {
            uploadedAt = Instant.now();
        }
    }
}