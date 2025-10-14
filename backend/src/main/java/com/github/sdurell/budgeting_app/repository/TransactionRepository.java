package com.github.sdurell.budgeting_app.repository;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.github.sdurell.budgeting_app.dto.ChartDto;
import com.github.sdurell.budgeting_app.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    
    @Query("""
        SELECT new com.github.sdurell.budgeting_app.dto.ChartDto(t.category, SUM(t.amount))
        FROM Transaction t
        WHERE t.user.id = :userId 
        GROUP BY t.category
        """)
    List<ChartDto> getUserChart(Long userId);

    List<Transaction> findByUserId(Long userId, Sort sort);
    
}