package com.sdurell.budget.dto;

import java.sql.Date;
import java.util.List;

import com.sdurell.budget.model.Statement;
import com.sdurell.budget.model.Transaction;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StatementDto {
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String company;
    @NotNull
    private Date date;
    private Date uploadDate;
    @NotBlank
    private String filename;
    private List<TransactionDto> transactions;

    public Statement toEntity() {
        Statement statement = new Statement();
        statement.setId(this.id);
        statement.setName(this.name);
        statement.setCompany(this.company);
        statement.setDate(this.date);
        statement.setUploadDate(this.uploadDate);
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
        dto.setId(statement.getId());
        dto.setName(statement.getName());
        dto.setCompany(statement.getCompany());
        dto.setDate(statement.getDate());
        dto.setUploadDate(statement.getUploadDate());
        dto.setFilename(statement.getFilename());
        if (statement.getTransactions() != null){
            dto.setTransactions(statement.getTransactions()
                .stream().map(TransactionDto::fromEntity).toList());
        }
        return dto;  
    }
}
