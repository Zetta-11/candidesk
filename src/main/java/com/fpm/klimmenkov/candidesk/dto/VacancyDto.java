package com.fpm.klimmenkov.candidesk.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VacancyDto {
    private int id;
    private String title;
    private String description;
    private String requirements;
    private Long createdById;
    private String createdByLogin;
    private List<Long> candidateIds;
    private List<Long> taskIds;
    private String createdAt;
}
