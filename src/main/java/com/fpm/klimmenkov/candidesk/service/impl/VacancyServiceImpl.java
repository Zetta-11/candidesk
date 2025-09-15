package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.Entity.Vacancy;
import com.fpm.klimmenkov.candidesk.exception.ResourceNotFoundException;
import com.fpm.klimmenkov.candidesk.repository.UserRepository;
import com.fpm.klimmenkov.candidesk.repository.VacancyRepository;
import com.fpm.klimmenkov.candidesk.service.UserService;
import com.fpm.klimmenkov.candidesk.service.VacancyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class VacancyServiceImpl implements VacancyService {

    private final VacancyRepository vacancyRepository;
    private final UserService userService;

    @Override
    public Vacancy saveVacancy(Vacancy vacancy) {
        User creator = userService.getUserById((long) vacancy.getCreatedBy().getId());
        vacancy.setCreatedBy(creator);

        return vacancyRepository.save(vacancy);
    }

    @Override
    public Vacancy updateVacancy(Long id, Vacancy vacancy) {
        Vacancy existingVacancy = vacancyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy is not found with the given ID: " + id));

        existingVacancy.setTitle(vacancy.getTitle());
        existingVacancy.setDescription(vacancy.getDescription());
        existingVacancy.setRequirements(vacancy.getRequirements());
        existingVacancy.setCreatedBy(vacancy.getCreatedBy());

        return vacancyRepository.save(existingVacancy);
    }

    @Override
    public List<Vacancy> getAllVacancies() {
        List<Vacancy> vacancies = vacancyRepository.findAll();
        return vacancies;
    }

    @Override
    public Vacancy getVacancyById(Long id) {
        Vacancy vacancy = vacancyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy is not found with the given ID: " + id));
        return vacancy;
    }

    @Override
    public void deleteVacancy(Long id) {
        Vacancy vacancyToDelete = vacancyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vacancy is not found with the given ID: " + id));
        vacancyRepository.delete(vacancyToDelete);
    }
}
