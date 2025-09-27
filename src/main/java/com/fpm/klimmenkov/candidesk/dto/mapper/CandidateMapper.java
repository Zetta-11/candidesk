package com.fpm.klimmenkov.candidesk.dto.mapper;

import com.fpm.klimmenkov.candidesk.Entity.Candidate;
import com.fpm.klimmenkov.candidesk.dto.CandidateDto;

public class CandidateMapper {
    // Entity -> DTO
    public static CandidateDto toDTO(Candidate candidate) {
        return CandidateDto.builder()
                .id(candidate.getId())
                .firstName(candidate.getFirstName())
                .lastName(candidate.getLastName())
                .email(candidate.getEmail())
                .phone(candidate.getPhone())
                .cvLink(candidate.getCvLink())
                .status(candidate.getStatus())
                .createdAt(candidate.getCreatedAt())
                .build();
    }

    // DTO -> Entity
    public static Candidate toEntity(CandidateDto dto) {
        return Candidate.builder()
                .id(dto.getId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .cvLink(dto.getCvLink())
                .status(dto.getStatus())
                .createdAt(dto.getCreatedAt())
                .build();
    }

}
