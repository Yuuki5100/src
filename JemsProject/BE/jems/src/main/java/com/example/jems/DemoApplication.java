package com.example.jems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);

		// //ユーザ作成しとく
		// System.out.println("テストユーザ作成するぜい");
		// User user = new User();

		// user.setUsername("mirei");
		// user.setPassword("mirei");
		// user.setEmail("mirei@example-co.jp");
		// user.setRole("ADMIN");

		// UserService userService = new UserService();
		// userService.register(user);
	}
}