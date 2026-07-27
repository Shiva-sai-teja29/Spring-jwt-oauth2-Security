package com.springsecurity.backend.Security.Business;

import com.springsecurity.backend.Security.Config.JwtService;
import com.springsecurity.backend.Security.Config.UserInfo;
import com.springsecurity.backend.Security.DTO.LoginResponse;
import com.springsecurity.backend.Security.DTO.RefreshTokenRequest;
import com.springsecurity.backend.Security.DTO.RegisterRequest;
import com.springsecurity.backend.Security.Entity.RefreshToken;
import com.springsecurity.backend.Security.Entity.User;
import com.springsecurity.backend.Security.Repo.RefreshTokenRepository;
import com.springsecurity.backend.Security.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class SecurityServiceImpl implements SecurityService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Override
    public ResponseEntity<LoginResponse> login(UserInfo user) {
        User user1 = userRepository.findByUsername(user.getUsername()).orElseThrow(()->new RuntimeException("User not matched with Role"));
        String accessToken = jwtService.generateToken(user1.getUsername());
        RefreshToken refreshToken = jwtService.createRefreshToken(user1.getEmail());
        LoginResponse resp = new LoginResponse();
        resp.setToken(accessToken);
        resp.setExpiryTime("60");
        resp.setRefreshToken(refreshToken);
        return ResponseEntity.ok(resp);
    }

    @Override
    public ResponseEntity<?> register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User created"));
    }

    @Override
    public ResponseEntity<LoginResponse> refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = jwtService.verifyRefreshToken(request.getRefreshToken());
        String accessToken = jwtService.generateToken(refreshToken.getUser().getUsername());
        LoginResponse response = new LoginResponse();
        response.setToken(accessToken);
        response.setRefreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> logout(RefreshTokenRequest request) {
        refreshTokenRepository.deleteByToken(request.getRefreshToken());
        return ResponseEntity.ok("Logged Out");
    }
}
