package com.example.demo.repository;

import com.example.demo.model.SettingModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingRepository extends JpaRepository<SettingModel, String> {
    // 追加の検索メソッドなどが必要な場合、ここに定義できます
}
