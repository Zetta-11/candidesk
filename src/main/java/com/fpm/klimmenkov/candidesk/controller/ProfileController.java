package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.dto.ChangePasswordRequest;
import com.fpm.klimmenkov.candidesk.dto.UserDto;
import com.fpm.klimmenkov.candidesk.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserService userService;

    @GetMapping
    public UserDto getProfile(@AuthenticationPrincipal UserDetails userDetails) {

        User user = userService.getUserByLogin(userDetails.getUsername());

        return UserDto.builder()
                .id((long) user.getId())
                .login(user.getLogin())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(String.valueOf(user.getRoles()))
                .build();
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Authentication authentication) {

        String login = authentication.getName();

        userService.changePassword(login, request.getOldPassword(), request.getNewPassword());

        return ResponseEntity.ok("Password updated successfully");
    }

    @PostMapping("/delete-request")
    public ResponseEntity<String> deleteAccount(Authentication authentication) {

        userService.sendDeleteAccountRequest(authentication.getName());

        return ResponseEntity.ok("Account deletion request was sent successfully");
    }
}
