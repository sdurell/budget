package com.sdurell.budget.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sdurell.budget.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
        
}