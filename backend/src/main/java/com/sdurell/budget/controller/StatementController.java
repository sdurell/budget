package com.sdurell.budget.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping()
    public ResponseEntity<List<StatementDto>> getAll(Authentication auth) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long userId = userDetails.getId();

        List<StatementDto> dtos = statementService.getStatementsByUserId(userId);

        return ResponseEntity.ok(dtos);
    }

    @PostMapping()
    public ResponseEntity<StatementDto> create(
        Authentication auth, 
        @Valid @RequestBody StatementDto statementDto)
    {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long userId = userDetails.getId();

        StatementDto created = statementService.createStatement(userId, statementDto);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping()
    public ResponseEntity<Void> delete(
            Authentication auth, 
            @RequestParam List<Long> ids) 
        {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long userId = userDetails.getId();

        statementService.deleteStatements(userId, ids);
        return ResponseEntity.noContent().build();
    }
    
}
