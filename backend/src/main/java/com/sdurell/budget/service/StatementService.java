package com.sdurell.budget.service;

import org.springframework.stereotype.Service;

import com.sdurell.budget.dto.StatementDto;
import com.sdurell.budget.model.Statement;
import com.sdurell.budget.model.UserEntity;
import com.sdurell.budget.repository.StatementRepository;
import com.sdurell.budget.repository.UserRepository;

@Service
public class StatementService {
    
    private StatementRepository statementRepository;
    private UserRepository userRepository;
    
    public StatementService(StatementRepository statementRepository, UserRepository userRepository) {
        this.statementRepository = statementRepository;
        this.userRepository = userRepository;
    }

    public StatementDto createStatement(Long userId, StatementDto statementDto){
        if(statementRepository.existsByFilename(statementDto.getFilename())){
            throw new IllegalArgumentException("Filename already exists");
        }

        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User does not exist"));

        Statement statement = statementDto.toEntity();
        statement.setUser(user);

        Statement saved = statementRepository.save(statement);
        return StatementDto.fromEntity(saved);
    }
}
