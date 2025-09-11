package com.github.sdurell.budgeting_app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name="Customer")
@Getter
public class Customer {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String first;
    private String last;
    
    protected Customer() {}

    public Customer(String first, String last){
        this.first = first;
        this.last = last;
    }

    @Override
    public String toString() {
        return String.format(
            "Customer[id=%d, first='%s', last='%s']",
            id, first, last);
    }

}
