package com.cloudshare.repository;

import com.cloudshare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByClerkId(String clerkId);

    Optional<User> findByEmail(String email);
}