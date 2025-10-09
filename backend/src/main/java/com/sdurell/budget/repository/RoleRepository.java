package com.sdurell.budget.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdurell.budget.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	
    Optional<Role> findByName(String name);
    
}
