package com.github.sdurell.budgeting_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.sdurell.budgeting_app.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	
    Optional<Role> findByName(String name);
    
}
