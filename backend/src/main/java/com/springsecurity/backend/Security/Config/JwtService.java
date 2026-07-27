package com.springsecurity.backend.Security.Config;

import com.springsecurity.backend.Security.Entity.RefreshToken;
import com.springsecurity.backend.Security.Entity.User;
import com.springsecurity.backend.Security.Repo.RefreshTokenRepository;
import com.springsecurity.backend.Security.Repo.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class JwtService {

    private static SecretKey key;
    private static final String LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final SecureRandom random = new SecureRandom();

    public JwtService(@Value("${security.jwt.secret}") String secret) {
        try {
            key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid JWT secret key: " + e.getMessage(), e);
        }
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 120000))
                .signWith(key)
                .compact();
    }

    public RefreshToken createRefreshToken(String email) {
        RefreshToken refreshToken = new RefreshToken();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(
                LocalDateTime.ofInstant(
                        Instant.now().plusMillis(900000),
                        ZoneId.systemDefault()
                )
        );
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedAt(LocalDateTime.now());
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyRefreshToken(String token) {

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));

        if (refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new RuntimeException("Refresh Token Expired");
        }
        return refreshToken;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String extractUsername(String token) {
        Claims claims = Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload();
        return claims.getSubject();
    }

    public RefreshToken createRefreshTokenForFirstTimeLogin(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(
                LocalDateTime.ofInstant(
                        Instant.now().plusMillis(900000),
                        ZoneId.systemDefault()
                )
        );
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedAt(LocalDateTime.now());
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public String generateRandomString() {
        List<Character> charList = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            charList.add(LETTERS.charAt(random.nextInt(LETTERS.length())));
        }
        for (int i = 0; i < 4; i++) {
            charList.add(DIGITS.charAt(random.nextInt(DIGITS.length())));
        }
        Collections.shuffle(charList, random);
        StringBuilder sb = new StringBuilder(charList.size());
        for (char ch : charList) {
            sb.append(ch);
        }
        return sb.toString();
    }
}