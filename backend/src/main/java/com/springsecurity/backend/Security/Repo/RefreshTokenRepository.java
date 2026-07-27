package com.springsecurity.backend.Security.Repo;

import com.springsecurity.backend.Security.Entity.RefreshToken;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends BaseRepository<RefreshToken> {
    Optional<RefreshToken> findByToken(String token);

    void deleteByToken(String refreshToken);
}