package com.cloudshare.util;

import java.nio.file.Files;
import java.nio.file.Path;

/**
 * Utility to resolve the uploads directory regardless of
 * whether the backend is started from the workspace root
 * or from the backend/ sub-directory.
 */
public final class StorageUtils {

    private StorageUtils() {}

    /**
     * Returns an absolute, normalized Path to the uploads directory.
     * <ul>
     *   <li>If {@code ./uploads} exists → use it (running from workspace root)</li>
     *   <li>Otherwise fall back to {@code ../uploads} (running from backend/)</li>
     * </ul>
     */
    public static Path getUploadsPath() {
        Path local = Path.of("uploads").toAbsolutePath().normalize();
        if (Files.isDirectory(local)) {
            return local;
        }
        Path parent = Path.of("../uploads").toAbsolutePath().normalize();
        if (Files.isDirectory(parent)) {
            return parent;
        }
        // Default — will be created on first upload
        return local;
    }
}
