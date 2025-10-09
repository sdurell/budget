package com.sdurell.budget.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdurell.budget.model.RefreshToken;
import com.sdurell.budget.model.UserEntity;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);
    void deleteByUser(UserEntity user);
}
