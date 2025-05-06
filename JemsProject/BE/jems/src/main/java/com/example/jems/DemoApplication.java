package com.example.jems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);

        // BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        // String rawPassword = "password123";
        // String encodedPassword = encoder.encode(rawPassword);

        // System.out.println("Encoded password: " + encodedPassword);
	}
}