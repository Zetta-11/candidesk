package com.fpm.klimmenkov.candidesk.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkLogin(Authentication authentication) {
        boolean isLoggedIn = authentication != null && authentication.isAuthenticated();
        return ResponseEntity.ok(isLoggedIn);
    }
}
