package com.sdurell.budget.config;

import java.util.Collections;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.sdurell.budget.model.Role;
import com.sdurell.budget.model.UserEntity;
import com.sdurell.budget.repository.RoleRepository;
import com.sdurell.budget.repository.UserRepository;

@Component
public class DataInit implements CommandLineRunner {
    
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    
    public DataInit(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if(!roleRepository.existsByName("USER")){
            Role newRole = new Role();
            newRole.setName("USER");
            roleRepository.save(newRole);
        }

        if(!userRepository.existsByUsername("user")){
            UserEntity user = new UserEntity();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("password"));

            Role roles = roleRepository.findByName("USER").get();
            user.setRoles(Collections.singletonList(roles));

            userRepository.save(user);
        }
    }
}
