package com.sdurell.budget.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdurell.budget.model.Statement;

public interface StatementRepository extends JpaRepository<Statement, Long> {

    Boolean existsByFilenameAndUserId(String filename, Long userId);

    List<Statement> findAllByUserIdOrderByDate(Long userId);

    List<Statement> findAllByIdInAndUserId(List<Long> ids, Long userId);

    void deleteByIdInAndUserId(List<Long> ids, Long userId);
}
