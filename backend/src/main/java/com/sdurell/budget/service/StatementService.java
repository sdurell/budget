package com.sdurell.budget.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sdurell.budget.dto.StatementDto;
import com.sdurell.budget.exception.DuplicateFilenameException;
import com.sdurell.budget.exception.StatementNotFoundException;
import com.sdurell.budget.exception.UserNotFoundException;
import com.sdurell.budget.model.Statement;
import com.sdurell.budget.model.UserEntity;
import com.sdurell.budget.repository.StatementRepository;
import com.sdurell.budget.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class StatementService {
    
    private StatementRepository statementRepository;
    private UserRepository userRepository;
    
    public StatementService(StatementRepository statementRepository, UserRepository userRepository) {
        this.statementRepository = statementRepository;
        this.userRepository = userRepository;
    }

    public List<StatementDto> getStatementsByUserId(Long userId) {
        return statementRepository.findAllByUserId(userId)
            .stream()
            .map(StatementDto::fromEntity)
            .toList();
    }

    public StatementDto createStatement(Long userId, StatementDto statementDto){
        if(statementRepository.existsByFilenameAndUserId(statementDto.getFilename(), userId)){
            throw new DuplicateFilenameException(statementDto.getFilename());
        }

        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException(userId));

        Statement statement = statementDto.toEntity();
        statement.setUser(user);

        Statement saved = statementRepository.save(statement);
        return StatementDto.fromEntity(saved);
    }

    @Transactional
    public void deleteStatements(Long userId, List<Long> statementIds){
        if(statementRepository.findAllByIdInAndUserId(statementIds, userId).size() != statementIds.size()){
            throw new StatementNotFoundException("One or more statements not found.");
        }
        statementRepository.deleteByIdInAndUserId(statementIds, userId);       
    }
}
