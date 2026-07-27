package com.springsecurity.backend.Security.DTO;

import com.springsecurity.backend.Security.Entity.RefreshToken;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String expiryTime;
    private RefreshToken refreshToken;
}
