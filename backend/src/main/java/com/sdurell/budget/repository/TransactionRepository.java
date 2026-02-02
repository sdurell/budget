package com.sdurell.budget.repository;
import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdurell.budget.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    
    List<Transaction> findAllByStatementUserIdAndDateBetweenOrderByDateDescNameDesc(
        Long userId,
        Date startDate,
        Date endDate
    );
}