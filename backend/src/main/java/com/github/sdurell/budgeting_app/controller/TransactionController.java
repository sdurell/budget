package com.github.sdurell.budgeting_app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.sdurell.budgeting_app.dto.ChartDto;
import com.github.sdurell.budgeting_app.dto.TransactionDto;
import com.github.sdurell.budgeting_app.repository.TransactionRepository;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping("/summary")
    public List<TransactionDto> getAll(){
        return transactionRepository.findAll()
            .stream()
            .map(s -> new TransactionDto(s.getName(), s.getDate(), s.getAmount(), s.getCategory()))
            .toList();
    }

    @GetMapping("/chart")
    public List<ChartDto> getChartData(){
        return transactionRepository.getChartSummary()
            .stream()
            .filter(s -> !s.getCategory().equals("Payment"))
            .map(s -> new ChartDto(s.getCategory(), s.getTotal().abs()))
            .toList();
    }
    
}
