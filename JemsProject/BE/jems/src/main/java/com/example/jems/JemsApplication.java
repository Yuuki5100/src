package com.example.jems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

