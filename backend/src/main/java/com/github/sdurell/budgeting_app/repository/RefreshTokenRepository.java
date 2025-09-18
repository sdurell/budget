package com.github.sdurell.budgeting_app.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.sdurell.budgeting_app.model.RefreshToken;
import com.github.sdurell.budgeting_app.model.UserEntity;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);
    void deleteByUser(UserEntity user);
}
