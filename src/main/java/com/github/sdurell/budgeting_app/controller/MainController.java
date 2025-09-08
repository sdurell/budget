package com.github.sdurell.budgeting_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.sdurell.budgeting_app.model.Customer;
import com.github.sdurell.budgeting_app.services.CustomerService;


@RestController
@RequestMapping(path="/customer")
public class MainController {
    
    @Autowired
    private CustomerService customerService;

    @RequestMapping(path="/")
    public String home(){
        return "Hello World";
    }

    @PostMapping(path="/add")
    public @ResponseBody Customer addNewCustomer (@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }
    
}
