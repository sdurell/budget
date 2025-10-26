package com.sdurell.budget.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdurell.budget.repository.UserRepository;


@RestController
@RequestMapping("/api/statements")
public class StatementController {
    
    @Autowired
    private CustomerUserDetailsService userDetailsService;

    private StatementRepository statementRepository;
    private UserRepository userRepository;
    
    public StatementController(StatementRepository statementRepository, UserRepository userRepository) {
        this.statementRepository = statementRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(Authentication auth, RequestBody StatementDto statementDto){
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long userId = userDetails.getId();

        Statement statement = new Statement();
        statement.setName(statementDto.getName());
        statement.setCompany(statementDto.getCompany());
        statement.setMonth(statementDto.getMonth());
        statement.setFilename(statementDto.getFilename());
        statement.setTransactions(statementDto.getTransactions());

        
    }
    
}
