package com.springsecurity.backend.Security.Business;

import com.springsecurity.backend.Security.Config.UserInfo;
import com.springsecurity.backend.Security.DTO.LoginResponse;
import com.springsecurity.backend.Security.DTO.RefreshTokenRequest;
import com.springsecurity.backend.Security.DTO.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

public interface SecurityService {

    ResponseEntity<LoginResponse> login(UserInfo user);

    ResponseEntity<?> register(@Valid RegisterRequest request);

    ResponseEntity<LoginResponse> refreshToken(RefreshTokenRequest request);

    ResponseEntity<?> logout(RefreshTokenRequest request);
}