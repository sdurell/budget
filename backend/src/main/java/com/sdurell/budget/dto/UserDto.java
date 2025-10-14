package com.sdurell.budget.dto;

import com.sdurell.budget.model.UserEntity;

import lombok.Data;

@Data
public class UserDto {
    private String username;

    public UserDto(UserEntity user){
        this.username = user.getUsername();
    }
}
