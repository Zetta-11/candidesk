package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;
import com.fpm.klimmenkov.candidesk.service.CandidateService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/api/candidates")
@AllArgsConstructor
@RestController
public class CandidateController {

    private final CandidateService candidateService;

    @PostMapping
    public ResponseEntity<Candidate> createCandidate(@Valid @RequestBody Candidate candidate) {
        Candidate createdCandidate = candidateService.saveCandidate(candidate);
        return new ResponseEntity<>(createdCandidate, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        List<Candidate> candidates = candidateService.getAllCandidates();
        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
        Candidate candidate = candidateService.getCandidateById(id);
        return new ResponseEntity<>(candidate, HttpStatus.OK);
    }

    @GetMapping("email")
    public ResponseEntity<Candidate> getCandidateByEmail(@RequestParam String email) {
        Candidate candidate = candidateService.getCandidateByEmail(email);
        return new ResponseEntity<>(candidate, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidate) {
        Candidate candidateUpdated = candidateService.updateCandidate(id, candidate);
        return new ResponseEntity<>(candidateUpdated, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCandidate(@PathVariable Long id) {
        candidateService.deleteCandidate(id);
        return ResponseEntity.ok("The candidate was deleted!");
    }
}
