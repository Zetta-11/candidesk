package com.fpm.klimmenkov.candidesk.repository;

import com.fpm.klimmenkov.candidesk.Entity.Vacancy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacancyRepository extends JpaRepository<Vacancy, Long> {
}
