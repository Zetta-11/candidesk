package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.Entity.Vacancy;
import com.fpm.klimmenkov.candidesk.service.VacancyService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/api/vacancies")
@AllArgsConstructor
@RestController
public class VacancyController {

    private final VacancyService vacancyService;

    @PostMapping
    public ResponseEntity<Vacancy> createVacancy(@Valid @RequestBody Vacancy vacancy) {
        Vacancy vacancyToSave = vacancyService.saveVacancy(vacancy);
        return new ResponseEntity<>(vacancyToSave, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Vacancy>> getAllVacancies() {
        List<Vacancy> vacancies = vacancyService.getAllVacancies();
        return new ResponseEntity<>(vacancies, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Vacancy> getVacancyById(@PathVariable Long id) {
        Vacancy vacancy = vacancyService.getVacancyById(id);
        return new ResponseEntity<>(vacancy, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Vacancy> updateVacancy(@PathVariable Long id, @Valid @RequestBody Vacancy vacancy) {
        Vacancy updatedVacancy = vacancyService.updateVacancy(id, vacancy);
        return new ResponseEntity<>(updatedVacancy, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVacancy(@PathVariable Long id) {
        vacancyService.deleteVacancy(id);
        return ResponseEntity.ok("Vacancy deleted successfully!");
    }
}
