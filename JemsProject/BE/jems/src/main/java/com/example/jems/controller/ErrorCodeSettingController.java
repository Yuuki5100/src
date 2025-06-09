package com.example.jems.controller;

import com.example.jems.model.ErrorCodeRequest;
import com.example.jems.model.ErrorCodeSettingModel;
import com.example.jems.service.ErrorCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("user/error-codes")
public class ErrorCodeSettingController {

    @Autowired
    private ErrorCodeService errorCodeService;

    /**
     * 全エラーコードを取得
     * GET /error-codes
     */
    @GetMapping
    public List<ErrorCodeSettingModel> getAllErrorCodes() {
        return errorCodeService.findAll();
    }

    /**
     * 新しいエラーコードを登録または更新
     * POST /error-codes
     */
    @PostMapping
    public ResponseEntity<ErrorCodeSettingModel> createOrUpdateErrorCode(@RequestBody ErrorCodeSettingModel errorCode) {
        ErrorCodeSettingModel result = errorCodeService.saveOrUpdate(errorCode);
        return ResponseEntity.ok(result);
    }

    /**
     * 指定されたコードとロケールのエラーコードを更新
     * PUT /error-codes/{code}?locale=xx
     */
    @PutMapping("/{code}")
    public ResponseEntity<ErrorCodeSettingModel> updateErrorCodeMessage(
            @PathVariable String code,
            @RequestBody ErrorCodeRequest request) {

        Optional<ErrorCodeSettingModel> updated = errorCodeService.updateMessage(code, request.getLocale(), request.getMessage());
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
