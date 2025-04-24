package com.example.jems.service;

import com.example.jems.model.SettingModel;
import com.example.jems.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SettingService {

    @Autowired
    private SettingRepository settingRepository;

    /**
     * 全ての設定を取得する
     */
    public List<SettingModel> findAllSettings() {
        return settingRepository.findAll();
    }

    /**
     * 指定された key の設定を更新する
     * @param key 設定キー
     * @param value 新しい設定値
     * @return 更新後の設定
     */
    public Optional<SettingModel> updateSetting(String key, String value) {
        Optional<SettingModel> settingOptional = settingRepository.findById(key);
        if (settingOptional.isPresent()) {
            SettingModel setting = settingOptional.get();
            setting.setValue(value);
            settingRepository.save(setting);
            return Optional.of(setting);
        } else {
            return Optional.empty(); // keyが存在しない場合
        }
    }

    /**
     * 指定された key の設定を削除する
     * @param key 設定キー
     * @return 削除成功フラグ
     */
    public boolean deleteSetting(String key) {
        if (settingRepository.existsById(key)) {
            settingRepository.deleteById(key);
            return true;
        } else {
            return false; // keyが存在しない
        }
    }
}
