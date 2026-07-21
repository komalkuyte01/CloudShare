package com.cloudshare.repository;

import com.cloudshare.entity.Profile;
import com.cloudshare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByUser(User user);

    boolean existsByClerkId(String clerkId);
}