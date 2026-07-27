package com.springsecurity.backend.Security.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenRequest {

    private String refreshToken;

}