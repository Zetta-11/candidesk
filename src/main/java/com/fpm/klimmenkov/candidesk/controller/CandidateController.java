package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.dto.CandidateDto;
import com.fpm.klimmenkov.candidesk.dto.mapper.CandidateMapper;
import com.fpm.klimmenkov.candidesk.service.CandidateService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/candidates")
@AllArgsConstructor
@RestController
public class CandidateController {

    private final CandidateService candidateService;

    @PostMapping
    public ResponseEntity<CandidateDto> createCandidate(@Valid @RequestBody CandidateDto candidateDto) {
        var candidate = candidateService.saveCandidate(CandidateMapper.toEntity(candidateDto));
        return new ResponseEntity<>(CandidateMapper.toDTO(candidate), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CandidateDto>> getAllCandidates() {
        List<CandidateDto> candidates = candidateService.getAllCandidates();
        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<CandidateDto> getCandidateById(@PathVariable Long id) {
        var candidate = candidateService.getCandidateById(id);
        return new ResponseEntity<>(CandidateMapper.toDTO(candidate), HttpStatus.OK);
    }

    @GetMapping("email")
    public ResponseEntity<CandidateDto> getCandidateByEmail(@RequestParam String email) {
        var candidate = candidateService.getCandidateByEmail(email);
        return new ResponseEntity<>(CandidateMapper.toDTO(candidate), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<CandidateDto> updateCandidate(@PathVariable Long id, @Valid @RequestBody CandidateDto candidateDto) {
        var candidate = candidateService.updateCandidate(id, CandidateMapper.toEntity(candidateDto));
        return new ResponseEntity<>(CandidateMapper.toDTO(candidate), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCandidate(@PathVariable Long id) {
        candidateService.deleteCandidate(id);
        return ResponseEntity.ok("The candidate was deleted!");
    }
}
