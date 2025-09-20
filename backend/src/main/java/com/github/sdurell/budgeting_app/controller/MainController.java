package com.github.sdurell.budgeting_app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/test")
public class MainController {
    
    @GetMapping("/")
    public String getMethodName() {
        return "Auth worked!!!!";
    }
}
