package com.sdurell.budget.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sdurell.budget.config.TwoDecimalSerializer;

import lombok.Data;

@Data
public class ChartDto {
    private String category;
    @JsonSerialize(using = TwoDecimalSerializer.class)
    private BigDecimal total;
    
    public ChartDto(String category, BigDecimal total) {
        this.category = category;
        this.total = total;
    }
}
