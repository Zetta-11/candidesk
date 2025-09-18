package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.Task;
import com.fpm.klimmenkov.candidesk.dto.TaskDto;
import com.fpm.klimmenkov.candidesk.dto.mapper.TaskMapper;
import com.fpm.klimmenkov.candidesk.exception.ResourceNotFoundException;
import com.fpm.klimmenkov.candidesk.repository.CandidateRepository;
import com.fpm.klimmenkov.candidesk.repository.TaskRepository;
import com.fpm.klimmenkov.candidesk.repository.UserRepository;
import com.fpm.klimmenkov.candidesk.repository.VacancyRepository;
import com.fpm.klimmenkov.candidesk.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;
    private final VacancyRepository vacancyRepository;

    @Override
    public TaskDto saveTask(TaskDto dto) {
        Task task = new Task();
        TaskMapper.toEntity(task, dto);

        if (dto.getAssignedToId() != null) {
            task.setAssignedTo(userRepository.findById(dto.getAssignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + dto.getAssignedToId())));
        }
        if (dto.getRelatedCandidateId() != null) {
            task.setRelatedCandidate(candidateRepository.findById(dto.getRelatedCandidateId())
                    .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + dto.getRelatedCandidateId())));
        }
        if (dto.getRelatedVacancyId() != null) {
            task.setRelatedVacancy(vacancyRepository.findById(dto.getRelatedVacancyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vacancy not found with id: " + dto.getRelatedVacancyId())));
        }

        return TaskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        TaskMapper.toEntity(task, dto);

        if (dto.getAssignedToId() != null) {
            task.setAssignedTo(userRepository.findById(dto.getAssignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + dto.getAssignedToId())));
        }
        if (dto.getRelatedCandidateId() != null) {
            task.setRelatedCandidate(candidateRepository.findById(dto.getRelatedCandidateId())
                    .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + dto.getRelatedCandidateId())));
        }
        if (dto.getRelatedVacancyId() != null) {
            task.setRelatedVacancy(vacancyRepository.findById(dto.getRelatedVacancyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vacancy not found with id: " + dto.getRelatedVacancyId())));
        }

        return TaskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        return TaskMapper.toDto(task);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        taskRepository.delete(task);
    }
}
