package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.Log;
import com.fpm.klimmenkov.candidesk.dto.LogDto;
import com.fpm.klimmenkov.candidesk.dto.mapper.LogMapper;
import com.fpm.klimmenkov.candidesk.repository.LogRepository;
import com.fpm.klimmenkov.candidesk.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LogServiceImpl implements LogService {

    private final LogRepository logRepository;
    private final LogMapper logMapper;

    @Override
    public LogDto saveLog(Log log) {
        Log savedLog = logRepository.save(log);
        return logMapper.toDto(savedLog);
    }

    @Override
    public List<LogDto> getAllLogs() {
        return logRepository.findAll()
                .stream()
                .map(logMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void clearAllLogs() {
        logRepository.deleteAll();
    }
}
