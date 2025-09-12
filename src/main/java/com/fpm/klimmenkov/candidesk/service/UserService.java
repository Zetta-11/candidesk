package com.fpm.klimmenkov.candidesk.service;

import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.dto.UserDto;

import java.util.List;

public interface UserService {

    User saveUser(User user);

    User updateUser(Long id, UserDto user);

    List<UserDto> getAllUsers();

    User getUserByLogin(String login);

    User getUserById(Long id);

    void deleteUser(Long id);
}
