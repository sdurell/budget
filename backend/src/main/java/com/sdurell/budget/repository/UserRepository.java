package com.sdurell.budget.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdurell.budget.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	
    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsername(String username);

    Optional<UserEntity> findById(Long id);
    
}
