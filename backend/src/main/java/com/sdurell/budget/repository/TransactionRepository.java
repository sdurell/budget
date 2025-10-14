package com.sdurell.budget.repository;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sdurell.budget.dto.ChartDto;
import com.sdurell.budget.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    
    @Query("""
        SELECT new com.sdurell.budget.dto.ChartDto(t.category, SUM(t.amount))
        FROM Transaction t
        WHERE t.user.id = :userId 
        GROUP BY t.category
        """)
    List<ChartDto> getUserChart(Long userId);

    List<Transaction> findByUserId(Long userId, Sort sort);
    
}