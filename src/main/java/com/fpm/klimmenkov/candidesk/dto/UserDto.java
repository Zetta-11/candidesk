package com.fpm.klimmenkov.candidesk.dto;

import com.fpm.klimmenkov.candidesk.Entity.Interview;
import com.fpm.klimmenkov.candidesk.Entity.Vacancy;
import com.fpm.klimmenkov.candidesk.Entity.status.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String login;
    private String firstName;
    private String lastName;
    private String role;
    /*private List<Vacancy> vacancies;
    private List<Interview> interviews;*/
}
