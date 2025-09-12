package com.github.sdurell.budgeting_app.repository;

import java.util.List;

import com.github.sdurell.budgeting_app.model.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    List<Customer> findByLast(String last);

    Customer findById(long id);
    
}
