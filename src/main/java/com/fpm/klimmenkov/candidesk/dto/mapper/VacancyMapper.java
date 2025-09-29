package com.fpm.klimmenkov.candidesk.dto.mapper;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;
import com.fpm.klimmenkov.candidesk.Entity.Task;
import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.Entity.Vacancy;
import com.fpm.klimmenkov.candidesk.dto.VacancyDto;
import org.hibernate.Hibernate;

import java.util.HashSet;
import java.util.List;

public class VacancyMapper {

    // DTO → Entity
    public static Vacancy toEntity(VacancyDto dto, User creator,
                                   List<Candidate> candidates,
                                   List<Task> tasks) {
        Vacancy vacancy = new Vacancy();
        vacancy.setId(dto.getId());
        vacancy.setTitle(dto.getTitle());
        vacancy.setDescription(dto.getDescription());
        vacancy.setRequirements(dto.getRequirements());
        vacancy.setCreatedBy(creator);
        vacancy.setCandidates(new HashSet<>(candidates));
        vacancy.setTasks(tasks);
        return vacancy;
    }

    // Entity → DTO
    public static VacancyDto toDto(Vacancy vacancy) {
        Long createdById = null;
        String createdByLogin = null;

        if (vacancy.getCreatedBy() != null) {
            createdById = (long) vacancy.getCreatedBy().getId();
            createdByLogin = vacancy.getCreatedBy().getLogin();
        }

        String createdAtStr = vacancy.getCreatedAt() != null
                ? vacancy.getCreatedAt().toString()
                : null;

        Hibernate.initialize(vacancy.getCandidates());
        Hibernate.initialize(vacancy.getTasks());

        List<Long> candidateIds = vacancy.getCandidates() == null
                ? List.of()
                : vacancy.getCandidates().stream()
                .map(c -> (long) c.getId())
                .toList();

        List<Long> taskIds = vacancy.getTasks() == null
                ? List.of()
                : vacancy.getTasks().stream()
                .map(t -> (long) t.getId())
                .toList();

        return new VacancyDto(
                vacancy.getId(),
                vacancy.getTitle(),
                vacancy.getDescription(),
                vacancy.getRequirements(),
                createdById,
                createdByLogin,
                candidateIds,
                taskIds,
                createdAtStr
        );
    }

}
