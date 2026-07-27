# Spring-jwt-oauth2-Security

Full-Stack Authentication System with JWT, Refresh Tokens & Google OAuth

A full-stack web application built as a monorepo, combining a Spring Boot backend and a React + TypeScript frontend to implement a secure, production-style authentication and authorization system with both traditional and social login support.

Overview:
This project demonstrates a complete login/session management flow using industry-standard security practices. It uses Spring Security to handle authentication and authorization on the backend, issuing short-lived JWT access tokens and long-lived refresh tokens to maintain secure, seamless user sessions. In addition to standard email/password login, users can also sign in using their Google account via OAuth2, providing a faster and more convenient authentication option.

Key Features:

Backend (Spring Boot + Spring Security):
User registration and login with encrypted password storage (BCrypt)
Google OAuth2 login integration using Spring Security OAuth2 Client
Automatic user provisioning — new accounts are created in the database on first Google sign-in, linking Google identity to the user profile
JWT-based stateless authentication (issued for both local and OAuth-based logins)
Refresh token mechanism for automatic access token renewal
Role-based access control (RBAC) for protected endpoints
Custom filters for token validation and request interception
Centralized exception handling for auth failures (expired/invalid tokens, OAuth errors)
Frontend (React + TypeScript):
"Sign in with Google" button integrated using Google Identity Services / OAuth2 flow
Type-safe API integration using Axios/Fetch with interceptors
Automatic token refresh handling (silent re-authentication on 401 errors)
Protected routes based on authentication state and user roles
Context API or Redux for managing auth state (supports both local and Google-authenticated sessions)
Persistent login using secure storage (HttpOnly cookies or localStorage, depending on implementation)

Authentication Flow:

User chooses either standard login (email/password) or "Sign in with Google."
For Google login, the frontend redirects to Google's OAuth consent screen and receives an authorization code/token.
The backend verifies the Google token, creates or fetches the user account, and issues its own JWT access token and refresh token — keeping token handling consistent regardless of login method.
All subsequent requests use the same JWT-based flow for authorization.

Architecture:
Both frontend and backend live in a single repository (monorepo structure), simplifying version control, shared documentation, and coordinated deployment while keeping clear separation between /backend and /frontend directories.

Tech Stack:
Java, Spring Boot, Spring Security, OAuth2 (Google), JWT, React, TypeScript, Axios, REST API

UI Pages

<img width="1907" height="815" alt="image" src="https://github.com/user-attachments/assets/24c3cf43-4459-405c-b535-4bfc688cfa8f" />

<img width="962" height="820" alt="image" src="https://github.com/user-attachments/assets/b44a22c1-c788-415c-990c-f09be5b1be56" />

<img width="976" height="866" alt="image" src="https://github.com/user-attachments/assets/cf6e6a8a-2479-4b23-983f-8a432ac0080e" />



