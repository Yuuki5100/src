package com.example.jems.repository;

import com.example.jems.model.ErrorCodeSettingModel;
import com.example.jems.model.ErrorCodeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ErrorCodeRepository extends JpaRepository<ErrorCodeSettingModel, ErrorCodeId> {
    // 必要に応じてカスタムクエリを定義できます
}
