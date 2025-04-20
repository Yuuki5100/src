package com.example;

import java.util.Arrays;
import java.util.Optional;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.enums.SubjectType;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);

		final int subjectCode = 1;

		Optional<String> code = Arrays.stream(SubjectType.values())
				.filter(data -> data.getCode() == (subjectCode))
				.findFirst()
				.orElse('3');

		System.out.println("出力結果:" + SubjectType.values());
	}
}