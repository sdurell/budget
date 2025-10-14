package com.sdurell.budget.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdurell.budget.dto.ChartDto;
import com.sdurell.budget.dto.TransactionDto;
import com.sdurell.budget.dto.UserDto;
import com.sdurell.budget.model.Transaction;
import com.sdurell.budget.model.UserEntity;
import com.sdurell.budget.repository.TransactionRepository;
import com.sdurell.budget.repository.UserRepository;
import com.sdurell.budget.security.CustomUserDetails;
import com.sdurell.budget.security.CustomUserDetailsService;

@RestController
@RequestMapping("/api/users/me")
public class UserController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    private TransactionRepository transactionRepository;
    private UserRepository userRepository;

    public UserController(
        TransactionRepository transactionRepository,
        UserRepository userRepository ) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping()
    public ResponseEntity<UserDto> getMe(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        UserEntity user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        UserDto dto = new UserDto(user);

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionDto>> getTransactions(Authentication authentication) {
        // Get user from security context
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getId();
        // define sort
        Sort sort = Sort.by(Sort.Order.desc("date"), Sort.Order.asc("name"));

        List<Transaction> transactions = transactionRepository.findByUserId(userId, sort);
        List<TransactionDto> dtos = transactions.stream()
            .map(s -> new TransactionDto(s.getId(), s.getName(), s.getDate(), s.getAmount(), s.getCategory()))
            .toList();

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/chart")
    public ResponseEntity<List<ChartDto>> getChartData(Authentication authentication){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getId();

        List<ChartDto> dtos = transactionRepository.getUserChart(userId)
            .stream()
            .filter(s -> !s.getCategory().equals("Payment"))
            .map(s -> new ChartDto(s.getCategory(), s.getTotal().abs()))
            .toList(); 
        return ResponseEntity.ok(dtos);
    }
    
}
