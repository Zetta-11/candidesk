package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;
import com.fpm.klimmenkov.candidesk.exception.ResourceNotFoundException;
import com.fpm.klimmenkov.candidesk.repository.CandidateRepository;
import com.fpm.klimmenkov.candidesk.service.CandidateService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CandidateServiceImpl implements CandidateService {

    private final CandidateRepository candidateRepository;

    @Override
    public Candidate saveCandidate(Candidate candidate) {
        candidateRepository.findByemail(candidate.getEmail())
                .ifPresent(c -> {
                    throw new IllegalArgumentException("Candidate with this login already exists");
                });
        candidateRepository.save(candidate);
        return candidate;
    }

    @Override
    public Candidate updateCandidate(Long id, Candidate candidate) {
        Candidate existingCandidate = candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate is not found with the given ID: " + id));


        existingCandidate.setFirstName(candidate.getFirstName());
        existingCandidate.setLastName(candidate.getLastName());
        //existingCandidate.setEmail(candidate.getEmail());
        existingCandidate.setPhone(candidate.getPhone());
        existingCandidate.setCvLink(candidate.getCvLink());
        existingCandidate.setStatus(candidate.getStatus());
        candidateRepository.save(existingCandidate);

        return existingCandidate;
    }

    @Override
    public List<Candidate> getAllCandidates() {
        List<Candidate> candidates = candidateRepository.findAll();
        return candidates;
    }

    @Override
    public Candidate getCandidateByEmail(String email) {
        Candidate candidate = candidateRepository.findByemail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate is not found with the given email: " + email));
        return candidate;
    }

    @Override
    public Candidate getCandidateById(Long id) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate is not found with the given ID: " + id));
        return candidate;
    }

    @Override
    public void deleteCandidate(Long id) {
        Candidate candidateToDelete = candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate is not found with the given ID: " + id));
        candidateRepository.delete(candidateToDelete);
    }
}
