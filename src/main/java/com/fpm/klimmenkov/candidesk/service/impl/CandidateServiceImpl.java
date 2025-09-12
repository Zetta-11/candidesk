package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;
import com.fpm.klimmenkov.candidesk.service.CandidateService;

import java.util.List;

public class CandidateServiceImpl implements CandidateService {
    @Override
    public Candidate saveCandidate(Candidate candidate) {
        return null;
    }

    @Override
    public Candidate updateCandidate(Long id, Candidate candidate) {
        return null;
    }

    @Override
    public List<Candidate> getAllCandidates() {
        return List.of();
    }

    @Override
    public Candidate getCandidateByEmail(String email) {
        return null;
    }

    @Override
    public Candidate getCandidateById(Long id) {
        return null;
    }

    @Override
    public void deleteCandidate(Long id) {

    }
}
