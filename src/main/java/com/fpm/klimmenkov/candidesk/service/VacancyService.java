package com.fpm.klimmenkov.candidesk.service;

import com.fpm.klimmenkov.candidesk.Entity.Vacancy;

import java.util.List;

public interface VacancyService {

    Vacancy saveVacancy(Vacancy vacancy);

    Vacancy updateVacancy(Long id, Vacancy vacancy);

    List<Vacancy> getAllVacancies();

    Vacancy getVacancyById(Long id);

    void deleteVacancy(Long id);
}
