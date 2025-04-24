package com.example.jems.controller;

import com.example.jems.model.SettingModel;
import com.example.jems.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/settings")
public class SettingController {

    @Autowired
    private SettingRepository settingRepository;

    /**
     * 設定一覧を取得
     * GET /settings
     */
    @GetMapping
    public List<SettingModel> getAllSettings() {
        return settingRepository.findAll();
    }

    /**
     * 設定の更新・追加
     * PUT /settings
     * ボディには { "key": "設定キー", "value": "設定値" } を指定
     */
    @PutMapping
    public ResponseEntity<SettingModel> updateSetting(@RequestBody SettingModel setting) {
        SettingModel updatedSetting = settingRepository.save(setting);
        return ResponseEntity.ok(updatedSetting);
    }

    /**
     * 設定のリロード（処理は仮実装。具体的には用途に応じて実装）
     * POST /settings/reload
     */
    @PostMapping("/reload")
    public ResponseEntity<String> reloadSettings() {
        // 実際の用途に応じてキャッシュのクリアや再読み込み処理を記述
        return ResponseEntity.ok("Settings reloaded successfully.");
    }
}
