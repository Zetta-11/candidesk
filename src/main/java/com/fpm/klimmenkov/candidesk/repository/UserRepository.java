package com.fpm.klimmenkov.candidesk.repository;

import com.fpm.klimmenkov.candidesk.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
