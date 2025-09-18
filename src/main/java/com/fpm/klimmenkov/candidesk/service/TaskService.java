package com.fpm.klimmenkov.candidesk.service;

import com.fpm.klimmenkov.candidesk.dto.TaskDto;

import java.util.List;

public interface TaskService {

    TaskDto saveTask(TaskDto task);

    TaskDto updateTask(Long id, TaskDto task);

    List<TaskDto> getAllTasks();

    TaskDto getTaskById(Long id);

    void deleteTask(Long id);
}
