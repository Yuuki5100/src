package com.example.jems;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {

        // SpringApplication.run(DemoApplication.class, args);

        // BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        // String rawPassword = "password123";
        // String encodedPassword = encoder.encode(rawPassword);

        // System.out.println("Encoded password: " + encodedPassword);

        System.out.println();

        try {
            Path path = Paths.get("card/clover");
            if (Files.isSameFile(path, Paths.get("/Sample/card/clover"))) {
                System.out.println("パスです：" + path.resolve("bar"));
            }
        } catch (java.io.IOException e) { }
    }
}