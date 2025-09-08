package com.fpm.klimmenkov.candidesk.repository;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
}
