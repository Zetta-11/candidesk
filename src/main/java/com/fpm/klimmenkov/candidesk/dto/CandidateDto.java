package com.fpm.klimmenkov.candidesk.dto;

import com.fpm.klimmenkov.candidesk.Entity.status.CandidateStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CandidateDto {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String cvLink;
    private String position;
    private CandidateStatus status;
    private LocalDateTime createdAt;
}
