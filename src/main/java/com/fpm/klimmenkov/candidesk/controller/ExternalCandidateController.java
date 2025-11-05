package com.fpm.klimmenkov.candidesk.controller;

import com.fpm.klimmenkov.candidesk.dto.CandidateDto;
import com.fpm.klimmenkov.candidesk.service.impl.CandidateScrapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/external/workua")
@AllArgsConstructor
public class ExternalCandidateController {

    @Autowired
    private final CandidateScrapper scraperService;

    @PostMapping("/search")
    public ResponseEntity<List<CandidateDto>> search(@RequestBody SearchRequest request) {
        try {
            List<CandidateDto> result = scraperService.searchCandidates(request.getQuery(), request.getPage());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(List.of());
        }
    }

    @Setter
    @Getter
    public static class SearchRequest {
        private String query;
        private int page;

    }

}
