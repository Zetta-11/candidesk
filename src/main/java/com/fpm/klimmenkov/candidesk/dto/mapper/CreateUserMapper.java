package com.fpm.klimmenkov.candidesk.dto.mapper;

import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.Entity.status.UserStatus;
import com.fpm.klimmenkov.candidesk.dto.UserCreateDto;

public class CreateUserMapper {
    //  DTO → Entity
    public static User toEntity(UserCreateDto dto) {
        return User.builder()
                .login(dto.getLogin())
                .password(dto.getPassword())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .roles(UserStatus.USER)
                .build();
    }

    // Entity → DTO
    public static UserCreateDto toDto(User user) {
        UserCreateDto dto = new UserCreateDto();
        dto.setLogin(user.getLogin());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        return dto;
    }
}
