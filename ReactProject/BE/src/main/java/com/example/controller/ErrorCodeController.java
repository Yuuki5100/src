package com.example.controller;

import com.example.demo.model.ErrorCodeModel;
import com.example.demo.service.ErrorCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/error-codes")
public class ErrorCodeController {

    @Autowired
    private ErrorCodeService errorCodeService;

    /**
     * 全エラーコードを取得
     * GET /error-codes
     */
    @GetMapping
    public List<ErrorCodeModel> getAllErrorCodes() {
        return errorCodeService.findAll();
    }

    /**
     * 新しいエラーコードを登録または更新
     * POST /error-codes
     */
    @PostMapping
    public ResponseEntity<ErrorCodeModel> createOrUpdateErrorCode(@RequestBody ErrorCodeModel errorCode) {
        ErrorCodeModel result = errorCodeService.saveOrUpdate(errorCode);
        return ResponseEntity.ok(result);
    }

    /**
     * 指定されたコードとロケールのエラーコードを更新
     * PUT /error-codes/{code}?locale=xx
     */
    @PutMapping("/{code}")
    public ResponseEntity<ErrorCodeModel> updateErrorCodeMessage(
            @PathVariable String code,
            @RequestParam String locale,
            @RequestBody String newMessage) {

        Optional<ErrorCodeModel> updated = errorCodeService.updateMessage(code, locale, newMessage);
        return updated.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * エラーコードのリロード（処理は仮）
     * POST /error-codes/reload
     */
    @PostMapping("/reload")
    public ResponseEntity<String> reloadErrorCodes() {
        // 処理内容はアプリケーションに応じて追加
        return ResponseEntity.ok("Error codes reloaded successfully.");
    }
}
