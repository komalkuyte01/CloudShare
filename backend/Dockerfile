# Stage 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application (skip tests for faster build)
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Create unprivileged application user
RUN groupadd --system cloudshare && useradd --system --gid cloudshare --create-home cloudshare

# Copy the jar file from the builder stage
COPY --from=builder --chown=cloudshare:cloudshare /app/target/cloudshare-0.0.1-SNAPSHOT.jar app.jar

USER cloudshare:cloudshare

# Expose the backend port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
