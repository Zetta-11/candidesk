package com.fpm.klimmenkov.candidesk.service;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;

import java.util.List;

public interface CandidateService {

    Candidate saveCandidate(Candidate candidate);

    Candidate updateCandidate(Long id, Candidate candidate);

    List<Candidate> getAllCandidates();

    Candidate getCandidateByEmail(String email);

    Candidate getCandidateById(Long id);

    void deleteCandidate(Long id);
}
