package com.cloudshare.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.InputStream;

@Service
@Slf4j
public class S3Service {

    private final S3Client s3Client;
    private final String bucketName;

    public S3Service(
            @Value("${aws.s3.bucket-name}") String bucketName,
            @Value("${aws.s3.region}") String region) {
        this.bucketName = bucketName;
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                // Automatically resolves credentials from IAM Role on AWS, or local AWS CLI/env
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
    }

    /**
     * Uploads an input stream directly to AWS S3.
     */
    public void uploadFile(String key, InputStream inputStream, long size, String contentType) {
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .contentLength(size)
                .build();

        s3Client.putObject(request, RequestBody.fromInputStream(inputStream, size));
        log.info("Uploaded file to S3: s3://{}/{}", bucketName, key);
    }

    /**
     * Streams an object directly from AWS S3.
     */
    public ResponseInputStream<GetObjectResponse> downloadFile(String key) {
        GetObjectRequest request = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        return s3Client.getObject(request);
    }

    /**
     * Deletes an object from AWS S3.
     */
    public void deleteFile(String key) {
        DeleteObjectRequest request = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        s3Client.deleteObject(request);
        log.info("Deleted file from S3: s3://{}/{}", bucketName, key);
    }
}
