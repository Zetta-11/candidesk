package com.fpm.klimmenkov.candidesk.repository;

import com.fpm.klimmenkov.candidesk.Entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository extends JpaRepository<Interview, Integer> {
}
