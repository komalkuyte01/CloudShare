package com.cloudshare.repository;

import com.cloudshare.entity.UserCredits;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCreditsRepository extends JpaRepository<UserCredits, Long> {

    Optional<UserCredits> findByCreditId(String creditId);

    boolean existsByCreditId(String creditId);

    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.data.jpa.repository.Query("UPDATE UserCredits u SET u.credits = u.credits + :creditsToAdd, u.plan = :plan WHERE u.creditId = :creditId")
    void addCreditsAtomically(String creditId, Integer creditsToAdd, String plan);
}
