package com.example.jems.service;

import com.example.jems.dto.AuthResponse;
import com.example.jems.dto.RegisterRequest;
import com.example.jems.dto.AuthRequest;
import com.example.jems.entity.User;
import com.example.jems.repository.UserRepository;
import com.example.jems.util.JwtUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class AuthService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtUtil jwtUtil;
    @Autowired
    private final AuthenticationManager authenticationManager;

    // ログイン処理
    public AuthResponse authenticate(AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()));

            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                String accessToken = jwtUtil.generateToken(user);
                String refreshToken = jwtUtil.generateRefreshToken(user);
                return new AuthResponse(accessToken, refreshToken);
            } else {
                throw new BadCredentialsException("Bad credentials");
            }
        } catch (BadCredentialsException ex) {
            // 認証失敗時の処理
            throw new RuntimeException("Invalid credentials", ex);
        }
    }

    // 新規登録処理
    public void register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole().toUpperCase()); // e.g., USER or ADMIN

        userRepository.save(user);
    }

    // リフレッシュトークン処理
    public AuthResponse refreshToken(String refreshToken) {
        String username = jwtUtil.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!jwtUtil.validateRefreshToken(refreshToken, user)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String newAccessToken = jwtUtil.generateToken(user);
        String newRefreshToken = jwtUtil.generateRefreshToken(user);

        return new AuthResponse(newAccessToken, newRefreshToken);
    }

}