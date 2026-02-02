package com.sdurell.budget.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sdurell.budget.dto.TransactionDto;
import com.sdurell.budget.repository.TransactionRepository;

@Service
public class TransactionService {
    
    private TransactionRepository transactionRepository;

    public TransactionService(
        TransactionRepository transactionRepository
    ) {
        this.transactionRepository = transactionRepository;
    }

    public List<TransactionDto> getTransactionsByUserId(
            Long userId,
            Date startDate,
            Date endDate
        ) {
        if (startDate == null) {
            startDate = Date.valueOf(LocalDate.now().minusMonths(1));
        }
        if (endDate == null) {
            endDate = Date.valueOf(LocalDate.now());
        }

        return transactionRepository.findAllByStatementUserIdAndDateBetweenOrderByDateDescNameDesc(
            userId,
            startDate,
            endDate
        )
            .stream()
            .map(TransactionDto::fromEntity)
            .toList();
    }
}
