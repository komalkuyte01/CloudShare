package com.cloudshare.document;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_credits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCredits {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String creditId; // stores clerkId

    @Builder.Default
    private Integer credits = 5;

    @Builder.Default
    private String plan = "BASIC";
}
