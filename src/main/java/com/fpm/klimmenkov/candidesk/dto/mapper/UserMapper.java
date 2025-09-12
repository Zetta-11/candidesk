package com.fpm.klimmenkov.candidesk.dto.mapper;

import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.dto.UserDto;

import java.util.ArrayList;

public class UserMapper {

    public static UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setLogin(user.getLogin());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());

        if (user.getVacancies() != null) {
            dto.setVacancies(new ArrayList<>(user.getVacancies()));
        }

        if (user.getInterviews() != null) {
            dto.setInterviews(new ArrayList<>(user.getInterviews()));
        }

        return dto;
    }
}
