package com.sdurell.budget.dto;

import java.math.BigDecimal;
import java.sql.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sdurell.budget.config.TwoDecimalSerializer;
import com.sdurell.budget.model.Transaction;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TransactionDto {
    private Long id;
    //TODO: add validators
    private String name;
    private Date date;
    @JsonSerialize(using = TwoDecimalSerializer.class)
    private BigDecimal amount;
    private String category;
    
    public TransactionDto(Long id, String name, Date date, BigDecimal amount, String category) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.amount = amount;
        this.category = category;
    }

    public Transaction toEntity() {
        Transaction transaction = new Transaction(); 
        transaction.setId(this.id);
        transaction.setName(this.name);
        transaction.setDate(this.date);
        transaction.setAmount(this.amount);
        transaction.setCategory(this.category);
        return transaction;
    }

    public static TransactionDto fromEntity(Transaction transaction) {
        TransactionDto dto = new TransactionDto();
        dto.setId(transaction.getId());
        dto.setName(transaction.getName());
        dto.setDate(transaction.getDate());
        dto.setAmount(transaction.getAmount());
        dto.setCategory(transaction.getCategory());
        return dto;
    }
}
