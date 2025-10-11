package com.github.sdurell.budgeting_app.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.Data;

@Data
public class TransactionDto {
    private String name;
    private Date date;
    private BigDecimal amount;
    private String category;
    
    public TransactionDto(String name, Date date, BigDecimal amount, String category) {
        this.name = name;
        this.date = date;
        this.amount = amount;
        this.category = category;
    }
}
