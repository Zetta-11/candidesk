package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.dto.VacancyDto;
import com.fpm.klimmenkov.candidesk.service.VacancyService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/vacancies")
@AllArgsConstructor
@RestController
public class VacancyController {

    private final VacancyService vacancyService;

    @PostMapping
    public ResponseEntity<VacancyDto> createVacancy(@Valid @RequestBody VacancyDto vacancy) {
        VacancyDto saved = vacancyService.saveVacancy(vacancy);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<VacancyDto>> getAllVacancies() {
        List<VacancyDto> vacancies = vacancyService.getAllVacancies();
        return new ResponseEntity<>(vacancies, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<VacancyDto> getVacancyById(@PathVariable Long id) {
        VacancyDto vacancy = vacancyService.getVacancyById(id);
        return new ResponseEntity<>(vacancy, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<VacancyDto> updateVacancy(@PathVariable Long id, @Valid @RequestBody VacancyDto vacancy) {
        VacancyDto updatedVacancy = vacancyService.updateVacancy(id, vacancy);
        return new ResponseEntity<>(updatedVacancy, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVacancy(@PathVariable Long id) {
        vacancyService.deleteVacancy(id);
        return ResponseEntity.ok("Vacancy deleted successfully!");
    }
}

