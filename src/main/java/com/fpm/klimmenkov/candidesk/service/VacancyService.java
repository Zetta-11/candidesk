package com.fpm.klimmenkov.candidesk.service;

import com.fpm.klimmenkov.candidesk.dto.VacancyDto;

import java.util.List;

public interface VacancyService {

    VacancyDto saveVacancy(VacancyDto vacancy);

    VacancyDto updateVacancy(Long id, VacancyDto vacancy);

    List<VacancyDto> getAllVacancies();

    VacancyDto getVacancyById(Long id);

    void deleteVacancy(Long id);
}
