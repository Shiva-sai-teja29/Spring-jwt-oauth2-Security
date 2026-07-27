package com.springsecurity.backend.Security.Repo;

import com.springsecurity.backend.Security.Entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<User> {
    Optional<User> findByEmail(String username);

    Optional<User> findByUsername(String username);
}