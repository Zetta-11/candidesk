package com.fpm.klimmenkov.candidesk.repository;

import com.fpm.klimmenkov.candidesk.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
