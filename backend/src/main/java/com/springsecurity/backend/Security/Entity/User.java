package com.springsecurity.backend.Security.Entity;

import com.springsecurity.backend.Security.DTO.AuthProvider;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String email;

    @Column(unique = true)
    private String username;

    private String password;

    @Column(unique = true,nullable = true)
    private String googleId;

    @Column(nullable = true)
    private String fullName;

    private String nickName;

    private String profileImage;

    @Builder.Default
    private boolean enabled = true;

    @Builder.Default
    private boolean accountNonLocked = true;

    @Builder.Default
    private boolean emailVerified = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private AuthProvider provider = AuthProvider.LOCAL;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    @Column(unique = true, length = 15)
    private String mobileNumber;

    @Column
    private Boolean mobileVerified = false;
}