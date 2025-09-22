package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.Entity.status.UserStatus;
import com.fpm.klimmenkov.candidesk.dto.UserDto;
import com.fpm.klimmenkov.candidesk.dto.mapper.UserMapper;
import com.fpm.klimmenkov.candidesk.exception.ResourceNotFoundException;
import com.fpm.klimmenkov.candidesk.repository.UserRepository;
import com.fpm.klimmenkov.candidesk.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        userRepository.findByLogin(user.getLogin()).ifPresent(u -> {
            throw new IllegalArgumentException("User with this login already exists");
        });

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setVacancies(new ArrayList<>());
        user.setInterviews(new ArrayList<>());

        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User is not found with the given ID: " + id));

        existingUser.setLogin(userDto.getLogin());
        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName(userDto.getLastName());
        existingUser.setRoles(UserStatus.valueOf(userDto.getRole()));
        userRepository.save(existingUser);

        return existingUser;
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream().map(UserMapper::toDto).toList();
        return users;
    }

    @Override
    public User getUserByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("User is not found with the given login: " + login));
        return user;
    }

    @Override
    public User getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User is not found with the given ID: " + id));
        return user;
    }

    @Override
    public void deleteUser(Long id) {
        User userToDelete = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User is not found with the given ID: " + id));
        userRepository.delete(userToDelete);
    }
}
