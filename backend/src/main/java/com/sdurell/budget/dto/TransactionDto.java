package com.sdurell.budget.dto;

import java.math.BigDecimal;
import java.sql.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sdurell.budget.config.TwoDecimalSerializer;

import lombok.Data;

@Data
public class TransactionDto {
    private Long id;
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
}
