package com.sdurell.budget.dto;

import java.util.List;

import com.sdurell.budget.model.Statement;
import com.sdurell.budget.model.Transaction;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StatementDto {
    @NotBlank
    private String name;
    @NotBlank
    private String company;
    @NotBlank
    private String month;
    @NotBlank
    private String filename;
    private List<TransactionDto> transactions;

    public Statement toEntity() {
        Statement statement = new Statement();
        statement.setName(this.name);
        statement.setCompany(this.company);
        statement.setMonth(this.month);
        statement.setFilename(this.filename);
        if (this.transactions != null) {
            statement.setTransactions(this.transactions.stream()
            .map(s -> {
                Transaction t = s.toEntity();
                t.setStatement(statement);
                return t;
            })
            .toList());
        }
        return statement;
    }

    public static StatementDto fromEntity(Statement statement) {
        StatementDto dto = new StatementDto();
        dto.setName(statement.getName());
        dto.setCompany(statement.getCompany());
        dto.setMonth(statement.getMonth());
        dto.setFilename(statement.getFilename());
        if (statement.getTransactions() != null){
            dto.setTransactions(statement.getTransactions()
                .stream().map(TransactionDto::fromEntity).toList());
        }
        return dto;  
    }
}
