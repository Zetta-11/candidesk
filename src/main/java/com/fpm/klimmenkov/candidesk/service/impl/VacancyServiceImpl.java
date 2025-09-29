package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;
import com.fpm.klimmenkov.candidesk.Entity.Task;
import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.Entity.Vacancy;
import com.fpm.klimmenkov.candidesk.dto.VacancyDto;
import com.fpm.klimmenkov.candidesk.dto.mapper.VacancyMapper;
import com.fpm.klimmenkov.candidesk.exception.ResourceNotFoundException;
import com.fpm.klimmenkov.candidesk.repository.CandidateRepository;
import com.fpm.klimmenkov.candidesk.repository.TaskRepository;
import com.fpm.klimmenkov.candidesk.repository.VacancyRepository;
import com.fpm.klimmenkov.candidesk.service.UserService;
import com.fpm.klimmenkov.candidesk.service.VacancyService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VacancyServiceImpl implements VacancyService {

    private final VacancyRepository vacancyRepository;
    private final UserService userService;
    private final CandidateRepository candidateRepository;
    private final TaskRepository taskRepository;

    @Override
    @Transactional
    public VacancyDto saveVacancy(VacancyDto vacancyDto) {
        User creator = userService.getUserById(vacancyDto.getCreatedById());
        if (creator == null) {
            throw new ResourceNotFoundException("User not found with ID: " + vacancyDto.getCreatedById());
        }

        List<Candidate> candidates = candidateRepository.findAllById(vacancyDto.getCandidateIds());
        List<Task> tasks = taskRepository.findAllById(vacancyDto.getTaskIds());

        Vacancy vacancy = VacancyMapper.toEntity(vacancyDto, creator, candidates, tasks);
        Vacancy saved = vacancyRepository.save(vacancy);

        saved.getCreatedBy().getId();

        Hibernate.initialize(vacancy.getCandidates());
        Hibernate.initialize(vacancy.getTasks());

        return VacancyMapper.toDto(saved);
    }

    @Override
    @Transactional
    public VacancyDto updateVacancy(Long id, VacancyDto vacancyDto) {
        Vacancy existingVacancy = vacancyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy not found: " + id));

        existingVacancy.setTitle(vacancyDto.getTitle());
        existingVacancy.setDescription(vacancyDto.getDescription());
        existingVacancy.setRequirements(vacancyDto.getRequirements());

        if (vacancyDto.getCreatedById() != null) {
            User creator = userService.getUserById(vacancyDto.getCreatedById());
            if (creator == null) {
                throw new ResourceNotFoundException("User not found with ID: " + vacancyDto.getCreatedById());
            }
            existingVacancy.setCreatedBy(creator);
        }

        List<Candidate> candidates = vacancyDto.getCandidateIds() != null && !vacancyDto.getCandidateIds().isEmpty()
                ? candidateRepository.findAllById(vacancyDto.getCandidateIds())
                : List.of();
        existingVacancy.getCandidates().clear();
        existingVacancy.getCandidates().addAll(candidates);

        List<Task> tasks = vacancyDto.getTaskIds() != null && !vacancyDto.getTaskIds().isEmpty()
                ? taskRepository.findAllById(vacancyDto.getTaskIds())
                : List.of();
        existingVacancy.getTasks().clear();
        existingVacancy.getTasks().addAll(tasks);

        Vacancy updated = vacancyRepository.save(existingVacancy);

        return VacancyMapper.toDto(updated);
    }


    @Override
    public List<VacancyDto> getAllVacancies() {
        List<Vacancy> vacancies = vacancyRepository.findAll();
        return vacancies.stream().map(VacancyMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public VacancyDto getVacancyById(Long id) {
        Vacancy vacancy = vacancyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy is not found with the given ID: " + id));
        return VacancyMapper.toDto(vacancy);
    }

    @Override
    public void deleteVacancy(Long id) {
        Vacancy vacancyToDelete = vacancyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vacancy is not found with the given ID: " + id));
        vacancyRepository.delete(vacancyToDelete);
    }
}
