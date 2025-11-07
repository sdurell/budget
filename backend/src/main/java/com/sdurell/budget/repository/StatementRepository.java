package com.sdurell.budget.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdurell.budget.model.Statement;

public interface StatementRepository extends JpaRepository<Statement, Integer> {

    Boolean existsByFilenameAndUserId(String filename, Long UserId);
}
