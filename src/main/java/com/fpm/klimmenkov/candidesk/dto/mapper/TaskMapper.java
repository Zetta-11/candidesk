package com.fpm.klimmenkov.candidesk.dto.mapper;

import com.fpm.klimmenkov.candidesk.Entity.Task;
import com.fpm.klimmenkov.candidesk.dto.TaskDto;

public class TaskMapper {


    public static TaskDto toDto(Task task) {
        TaskDto dto = new TaskDto();
        dto.setId((long) task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDueDate(task.getDueDate());
        dto.setStatus(task.getStatus());

        if (task.getAssignedTo() != null) {
            dto.setAssignedToId((long) task.getAssignedTo().getId());
            dto.setAssignedToLogin(task.getAssignedTo().getLogin());
        }
        if (task.getRelatedCandidate() != null) {
            dto.setRelatedCandidateId((long) task.getRelatedCandidate().getId());
            dto.setRelatedCandidateName(task.getRelatedCandidate().getFirstName() + " " + task.getRelatedCandidate().getLastName());
        }
        if (task.getRelatedVacancy() != null) {
            dto.setRelatedVacancyId((long) task.getRelatedVacancy().getId());
            dto.setRelatedVacancyTitle(task.getRelatedVacancy().getTitle());
        }
        return dto;
    }

    public static void toEntity(Task task, TaskDto dto) {
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setStatus(dto.getStatus());
    }
}
