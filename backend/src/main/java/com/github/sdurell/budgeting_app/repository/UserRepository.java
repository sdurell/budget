package com.github.sdurell.budgeting_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.sdurell.budgeting_app.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	
    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsername(String username);
    
}
