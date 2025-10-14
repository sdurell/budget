package com.github.sdurell.budgeting_app.dto;

import com.github.sdurell.budgeting_app.model.UserEntity;

import lombok.Data;

@Data
public class UserDto {
    private String username;

    public UserDto(UserEntity user){
        this.username = user.getUsername();
    }
}
