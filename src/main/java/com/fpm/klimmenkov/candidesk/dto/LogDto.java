package com.fpm.klimmenkov.candidesk.dto;

import com.fpm.klimmenkov.candidesk.Entity.status.ActionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogDto {
    private int id;
    private LocalDateTime createdAt;
    private String userLogin;
    private ActionType actionType;
}
