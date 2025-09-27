package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.dto.UserCreateDto;
import com.fpm.klimmenkov.candidesk.dto.UserDto;
import com.fpm.klimmenkov.candidesk.dto.mapper.CreateUserMapper;
import com.fpm.klimmenkov.candidesk.dto.mapper.UserMapper;
import com.fpm.klimmenkov.candidesk.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/users")
@AllArgsConstructor
@RestController
public class UserController {

    private UserService userService;

    @PostMapping
    public ResponseEntity<UserCreateDto> createUser(@Valid @RequestBody UserCreateDto userCreateDto) {
        User userEntity = CreateUserMapper.toEntity(userCreateDto);
        User createdUser = userService.saveUser(userEntity);

        UserCreateDto responseDto = CreateUserMapper.toDto(createdUser);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = UserMapper.toDto(userService.getUserById(id));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("login")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> getUserByLogin(@RequestParam String login) {
        UserDto user = UserMapper.toDto(userService.getUserByLogin(login));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @Valid @RequestBody UserDto userDto) {
        UserDto updatedUser = UserMapper.toDto(userService.updateUser(id, userDto));
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("The user was deleted!");
    }
}
