package com.cloudshare.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clerkId;

    private String firstName;

    private String lastName;

    private String email;

    private String photoUrl;

    private Integer credits;

    private Instant createdAt;
}
