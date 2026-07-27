package com.springsecurity.backend.Security.Oauth2;

import com.springsecurity.backend.Security.Config.JwtService;
import com.springsecurity.backend.Security.DTO.AuthProvider;
import com.springsecurity.backend.Security.Entity.RefreshToken;
import com.springsecurity.backend.Security.Entity.User;
import com.springsecurity.backend.Security.Repo.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private static final String FRONTEND_URL = "http://localhost:5173";

    public String newUsername(String name){
        if (userRepository.findByUsername(name).isEmpty()){
            return name;
        }
        String username = name+"_"+jwtService.generateRandomString();
        return newUsername(username);
    }

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        if (!(authentication.getPrincipal() instanceof OAuth2User user)) {
            throw new IllegalStateException("OAuth2 authentication failed");
        }
        String email = user.getAttribute("email");
        if (email == null || email.isBlank()) {
            throw new OAuth2AuthenticationException("Email not provided by Google");
        }
        String name = user.getAttribute("name");
        if (name == null || name.isBlank()) {
            name = email.substring(0, email.indexOf('@'));
        }
        String picture = user.getAttribute("picture");

        // Generate JWT
        String token = jwtService.generateToken(email);
        RefreshToken refreshToken;
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isEmpty()){
            User user1 = new User();
            user1.setEmail(email);
            user1.setUsername(newUsername(name));
            user1.setProvider(AuthProvider.GOOGLE);
            user1.setProfileImage(picture);
            user1.setCreatedAt(LocalDateTime.now());
            userRepository.save(user1);
            refreshToken = jwtService.createRefreshTokenForFirstTimeLogin(user1);
        }else {
            refreshToken = jwtService.createRefreshToken(email);
        }
        String url = UriComponentsBuilder.fromUriString(FRONTEND_URL + "/oauth-success")
                .queryParam("token", token).queryParam("refreshToken", refreshToken.getToken())
                .build().toUriString();
        response.sendRedirect(url);
    }
}