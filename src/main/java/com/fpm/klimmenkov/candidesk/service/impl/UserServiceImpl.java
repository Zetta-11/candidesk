package com.fpm.klimmenkov.candidesk.service.impl;

import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.Entity.status.UserStatus;
import com.fpm.klimmenkov.candidesk.dto.UserDto;
import com.fpm.klimmenkov.candidesk.dto.mapper.UserMapper;
import com.fpm.klimmenkov.candidesk.exception.ResourceNotFoundException;
import com.fpm.klimmenkov.candidesk.repository.UserRepository;
import com.fpm.klimmenkov.candidesk.service.UserService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("${manager.email}")
    private String managerEmail;

    @Override
    public User saveUser(User user) {
        userRepository.findByLogin(user.getLogin()).ifPresent(u -> {
            throw new IllegalArgumentException("User with this login already exists");
        });

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setVacancies(new ArrayList<>());
        user.setInterviews(new ArrayList<>());

        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User is not found with the given ID: " + id));

        existingUser.setLogin(userDto.getLogin());
        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName(userDto.getLastName());
        existingUser.setRoles(UserStatus.valueOf(userDto.getRole()));
        userRepository.save(existingUser);

        return existingUser;
    }

    @Override
    public void changePassword(String login, String oldPassword, String newPassword) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with login: " + login));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void sendDeleteAccountRequest(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        try {
            String html = loadHtmlTemplate();
            html = html.replace("%LOGIN%", user.getLogin())
                    .replace("%FIRST%", user.getFirstName())
                    .replace("%LAST%", user.getLastName());

            MimeMessage mime = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, "UTF-8");

            helper.setTo(managerEmail);
            helper.setFrom("Candidesk <" + managerEmail + ">");
            helper.setSubject("Delete Account Request");
            helper.setText(html, true);

            mailSender.send(mime);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }


    @Override
    public List<UserDto> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream().map(UserMapper::toDto).toList();
        return users;
    }

    @Override
    public User getUserByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("User is not found with the given login: " + login));
        return user;
    }

    @Override
    public User getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User is not found with the given ID: " + id));
        return user;
    }

    @Override
    public void deleteUser(Long id) {
        User userToDelete = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User is not found with the given ID: " + id));
        userRepository.delete(userToDelete);
    }

    private String loadHtmlTemplate() {
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream("templates/delete-account.html");
            if (inputStream == null) {
                throw new IllegalArgumentException("Template file not found: " + "templates/delete-account.html");
            }
            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Error reading HTML template", e);
        }
    }

}
