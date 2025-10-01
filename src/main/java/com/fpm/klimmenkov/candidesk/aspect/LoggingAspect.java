package com.fpm.klimmenkov.candidesk.aspect;

import com.fpm.klimmenkov.candidesk.Entity.Log;
import com.fpm.klimmenkov.candidesk.Entity.User;
import com.fpm.klimmenkov.candidesk.Entity.status.ActionType;
import com.fpm.klimmenkov.candidesk.configuration.MyUserDetails;
import com.fpm.klimmenkov.candidesk.repository.LogRepository;
import com.fpm.klimmenkov.candidesk.service.UserService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class LoggingAspect {

    private final LogRepository logRepository;
    private final UserService userService;

    @After("com.fpm.klimmenkov.candidesk.aspect.pointcut.LoggingPointcut.createMethods()")
    public void logCreate() {
        saveLog(ActionType.CREATE);
    }

    @After("com.fpm.klimmenkov.candidesk.aspect.pointcut.LoggingPointcut.updateMethods()")
    public void logUpdate() {
        saveLog(ActionType.UPDATE);
    }

    @After("com.fpm.klimmenkov.candidesk.aspect.pointcut.LoggingPointcut.deleteMethods()")
    public void logDelete() {
        saveLog(ActionType.DELETE);
    }

    private void saveLog(ActionType type) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = null;

        if (auth != null && auth.getPrincipal() instanceof MyUserDetails) {
            String username = ((MyUserDetails) auth.getPrincipal()).getUsername();
            user = userService.getUserByLogin(username);
        }

        Log log = Log.builder()
                .user(user)
                .actionType(type)
                .build();

        logRepository.save(log);
    }
}
