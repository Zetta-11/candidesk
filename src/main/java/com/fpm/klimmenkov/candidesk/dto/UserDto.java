package com.fpm.klimmenkov.candidesk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String login;
    private String firstName;
    private String lastName;
    private String role;
    /*private List<Vacancy> vacancies;
    private List<Interview> interviews;*/
}
