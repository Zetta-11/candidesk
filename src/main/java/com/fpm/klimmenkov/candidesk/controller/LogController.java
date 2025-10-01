package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.Entity.Log;
import com.fpm.klimmenkov.candidesk.dto.LogDto;
import com.fpm.klimmenkov.candidesk.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class LogController {

    private final LogService logService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<LogDto>> getAllLogs() {
        return ResponseEntity.ok(logService.getAllLogs());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LogDto> addLog(@RequestBody Log log) {
        return ResponseEntity.ok(logService.saveLog(log));
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> clearAllLogs() {
        logService.clearAllLogs();
        return ResponseEntity.noContent().build();
    }
}
