package com.cloudshare.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_credits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCredits {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "credit_id", nullable = false, unique = true)
    private String creditId;

    @Column(nullable = false)
    @Builder.Default
    private Integer credits = 10;

    @Column(nullable = false)
    @Builder.Default
    private String plan = "BASIC";
}
