package com.sdurell.budget.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdurell.budget.dto.UserDto;
import com.sdurell.budget.model.UserEntity;
import com.sdurell.budget.repository.TransactionRepository;
import com.sdurell.budget.repository.UserRepository;
import com.sdurell.budget.security.CustomUserDetails;

@RestController
@RequestMapping("/api/users/me")
public class UserController {

    private TransactionRepository transactionRepository;
    private UserRepository userRepository;

    public UserController(
        TransactionRepository transactionRepository,
        UserRepository userRepository ) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping()
    public ResponseEntity<UserDto> getMe(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        UserEntity user = userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        UserDto dto = new UserDto(user);

        return ResponseEntity.ok(dto);
    }
}
