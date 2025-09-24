package com.fpm.klimmenkov.candidesk.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateDto {

    @NotBlank(message = "Login cannot be blank!")
    @Pattern(regexp = "^[_A-Za-z0-9-+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
            message = "You must enter a correct email address")
    @Column(name = "login", length = 50, unique = true, nullable = false)
    private String login;

    @NotBlank(message = "Password cannot be blank!")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
            message = "Password must be at least 8 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character")
    @Column(name = "password", nullable = false)
    private String password;

    @Pattern(
            regexp = "^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']{1,29}$",
            message = "First name must start with a capital letter and contain only letters, length 2–30"
    )
    @NotBlank(message = "First name cannot be blank!")
    @Size(min = 2, max = 30, message = "First name must be between 2 and 30 characters")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Pattern(
            regexp = "^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']{1,29}$",
            message = "Last name must start with a capital letter and contain only letters, length 2–30"
    )
    @NotBlank(message = "Last name cannot be blank!")
    @Size(min = 2, max = 30, message = "Last name must be between 2 and 30 characters")
    @Column(name = "last_name", nullable = false)
    private String lastName;

}
