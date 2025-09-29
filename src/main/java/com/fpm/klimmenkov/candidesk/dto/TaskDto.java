package com.fpm.klimmenkov.candidesk.dto;

import com.fpm.klimmenkov.candidesk.Entity.status.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private Long assignedToId;
    private String assignedToLogin;
    private Long relatedCandidateId;
    private String relatedCandidateEmail;
    private Long relatedVacancyId;
    private String relatedVacancyTitle;
    private LocalDateTime dueDate;
    private TaskStatus status;
}
