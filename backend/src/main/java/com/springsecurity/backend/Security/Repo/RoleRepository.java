package com.springsecurity.backend.Security.Repo;

import com.springsecurity.backend.Security.Entity.Role;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RoleRepository extends BaseRepository<Role> {
    Optional<Role> findByName(String role);

}