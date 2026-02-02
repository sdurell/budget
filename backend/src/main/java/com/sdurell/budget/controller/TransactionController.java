package com.sdurell.budget.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sdurell.budget.dto.TransactionDto;
import com.sdurell.budget.security.CustomUserDetails;
import com.sdurell.budget.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    
    private TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    // Get all transactions in the past month (will expand options in future)
    @GetMapping()
    public ResponseEntity<List<TransactionDto>> getAll(
            Authentication auth,
            @RequestParam(required = false) Date startDate,
            @RequestParam(required = false) Date endDate
        ) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long userId = userDetails.getId();
        
        List<TransactionDto> dtos = transactionService.getTransactionsByUserId(userId, startDate, endDate);

        return ResponseEntity.ok(dtos);
    }
}
