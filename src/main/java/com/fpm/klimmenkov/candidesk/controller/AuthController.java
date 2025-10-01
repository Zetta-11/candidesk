package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.Entity.Log;
import com.fpm.klimmenkov.candidesk.Entity.status.ActionType;
import com.fpm.klimmenkov.candidesk.service.LogService;
import com.fpm.klimmenkov.candidesk.service.UserService;
import com.fpm.klimmenkov.candidesk.service.impl.JwtService;
import lombok.Data;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final LogService logService;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, LogService logService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.logService = logService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserDetails user = (UserDetails) authentication.getPrincipal();

        logService.saveLog(Log.builder()
                .user(userService.getUserByLogin(user.getUsername()))
                .actionType(ActionType.LOGIN)
                .build());

        return jwtService.generateToken(user);
    }

    @GetMapping("/check")
    public Object checkAuth(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        UserDetails user = (UserDetails) authentication.getPrincipal();
        return Map.of(
                "username", user.getUsername(),
                "role", user.getAuthorities().stream()
                        .findFirst()
                        .map(auth -> auth.getAuthority())
                        .orElse("")
        );
    }

    @Data
    static class LoginRequest {
        private String username;
        private String password;
    }
}
