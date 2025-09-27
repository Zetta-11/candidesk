package com.fpm.klimmenkov.candidesk.service;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;
import com.fpm.klimmenkov.candidesk.dto.CandidateDto;

import java.util.List;

public interface CandidateService {

    Candidate saveCandidate(Candidate candidate);

    Candidate updateCandidate(Long id, Candidate candidate);

    List<CandidateDto> getAllCandidates();

    Candidate getCandidateByEmail(String email);

    Candidate getCandidateById(Long id);

    void deleteCandidate(Long id);
}
