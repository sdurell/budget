package com.github.sdurell.budgeting_app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.sdurell.budgeting_app.model.Customer;
import com.github.sdurell.budgeting_app.repository.CustomerRepository;

@Service
public class CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    public Optional<Customer> getCustomerById(Long id){
        return customerRepository.findById(id);
    }

    public Customer addCustomer(Customer customer){
        Optional<Customer> cur = getCustomerById(customer.getId());

        if (cur == null){
            customerRepository.save(customer);    
        }
        return customer;
    }

    public Iterable<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }
    
}