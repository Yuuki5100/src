package com.example.jems.config;

import static org.mockito.Mockito.mock;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import com.example.jems.repository.ErrorCodeSettingRepository;
import com.example.jems.repository.UserRepository;
import com.example.jems.service.ErrorCodeService;
import com.example.jems.service.UserService;
import com.example.jems.util.JwtUtil;

@TestConfiguration
public class MockConfig {
    @Bean
    public JwtUtil jwtUtil() {
        return mock(JwtUtil.class);
    }

    @Bean
    public UserRepository userRepository() {
        return mock(UserRepository.class);
    }

    @Bean
    public UserService userService() {
        return new UserService(userRepository());
    }

    @Bean
    public ErrorCodeSettingRepository errorCodeSettingRepository() {
        return mock(ErrorCodeSettingRepository.class);
    }

    @Bean
    public ErrorCodeService errorCodeService() {
        return new ErrorCodeService(errorCodeSettingRepository());
    }
}