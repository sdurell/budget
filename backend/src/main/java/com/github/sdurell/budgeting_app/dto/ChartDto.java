package com.github.sdurell.budgeting_app.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ChartDto {
    private String category;
    private BigDecimal total;
    
    public ChartDto(String category, BigDecimal total) {
        this.category = category;
        this.total = total;
    }
}
