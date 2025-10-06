package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;
import com.fpm.klimmenkov.candidesk.dto.CandidateDto;
import com.fpm.klimmenkov.candidesk.dto.mapper.CandidateMapper;
import com.fpm.klimmenkov.candidesk.exception.ResourceNotFoundException;
import com.fpm.klimmenkov.candidesk.repository.CandidateRepository;
import com.fpm.klimmenkov.candidesk.service.CandidateService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CandidateServiceImpl implements CandidateService {

    private final CandidateRepository candidateRepository;

    @Override
    public Candidate saveCandidate(Candidate candidate) {
        candidateRepository.findByemail(candidate.getEmail())
                .ifPresent(c -> {
                    throw new IllegalArgumentException("Candidate with this email already exists");
                });
        return candidateRepository.save(candidate);
    }

    @Override
    public Candidate updateCandidate(Long id, Candidate candidate) {
        Candidate existingCandidate = candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate is not found with the given ID: " + id));

        existingCandidate.setFirstName(candidate.getFirstName());
        existingCandidate.setLastName(candidate.getLastName());
        existingCandidate.setPhone(candidate.getPhone());
        existingCandidate.setCvLink(candidate.getCvLink());
        existingCandidate.setStatus(candidate.getStatus());
        existingCandidate.setPosition(candidate.getPosition());

        return candidateRepository.save(existingCandidate);
    }

    @Override
    public List<CandidateDto> getAllCandidates() {
        return candidateRepository.findAll().stream()
                .map(CandidateMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Candidate getCandidateByEmail(String email) {
        return candidateRepository.findByemail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate is not found with the given email: " + email));
    }

    @Override
    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate is not found with the given ID: " + id));
    }

    @Override
    public void deleteCandidate(Long id) {
        Candidate candidateToDelete = candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate is not found with the given ID: " + id));
        candidateRepository.delete(candidateToDelete);
    }
}
