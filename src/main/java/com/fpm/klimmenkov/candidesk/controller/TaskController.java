package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.Entity.status.TaskStatus;
import com.fpm.klimmenkov.candidesk.dto.TaskDto;
import com.fpm.klimmenkov.candidesk.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/tasks")
@AllArgsConstructor
@RestController
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto dto) {
        TaskDto task = taskService.saveTask(dto);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @RequestBody TaskDto taskDto) {
        TaskDto updatedTask = taskService.updateTask(id, taskDto);
        return ResponseEntity.ok(updatedTask);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskDto> updateTaskStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        String statusStr = statusMap.get("status");
        TaskStatus status;
        try {
            status = TaskStatus.valueOf(statusStr);
        } catch (IllegalArgumentException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }

        TaskDto task = taskService.updateTaskStatus(id, status);
        return ResponseEntity.ok(task);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("The task was deleted!");
    }
}
