package com.example.jems.controller;

import com.example.jems.dto.AuthRequest;
import com.example.jems.dto.RegisterRequest;
import com.example.jems.service.AuthService;
import com.example.jems.dto.AuthResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final AuthService authService;

    // ログイン
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    // 新規登録
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    // リフレッシュトークン
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody String refreshToken) {
        return ResponseEntity.ok(authService.refreshToken(refreshToken));
    }

    // ログアウト（必要に応じてブラックリスト方式やクライアント側削除）
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // セッションレスならクライアント側でJWT削除
        return ResponseEntity.ok("Logged out");
    }
}