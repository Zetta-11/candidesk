package com.fpm.klimmenkov.candidesk.service;

import com.fpm.klimmenkov.candidesk.Entity.Log;
import com.fpm.klimmenkov.candidesk.dto.LogDto;

import java.util.List;

public interface LogService {
    LogDto saveLog(Log log);

    List<LogDto> getAllLogs();

    void clearAllLogs();
}
