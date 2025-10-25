package com.sdurell.budget.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdurell.budget.dto.StatementDto;
import com.sdurell.budget.security.CustomUserDetails;
import com.sdurell.budget.service.StatementService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/statements")
public class StatementController {

    private StatementService statementService;

    public StatementController(StatementService statementService) {
        this.statementService = statementService;
    }

    @PostMapping("/create")
    public ResponseEntity<StatementDto> create(
        Authentication auth, 
        @Valid @RequestBody StatementDto statementDto)
    {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long userId = userDetails.getId();

        StatementDto created = statementService.createStatement(userId, statementDto);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
