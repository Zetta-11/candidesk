package com.fpm.klimmenkov.candidesk.dto.mapper;

import com.fpm.klimmenkov.candidesk.Entity.Log;
import com.fpm.klimmenkov.candidesk.dto.LogDto;
import org.springframework.stereotype.Component;

@Component
public class LogMapper {

    public LogDto toDto(Log log) {
        if (log == null) return null;
        String login = log.getUser() != null ? log.getUser().getLogin() : "SYSTEM";
        return new LogDto(log.getId(), log.getCreatedAt(), login, log.getActionType());
    }
}
