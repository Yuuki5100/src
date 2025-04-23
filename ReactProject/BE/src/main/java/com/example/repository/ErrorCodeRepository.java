package com.example.demo.repository;

import com.example.demo.model.ErrorCodeModel;
import com.example.demo.model.ErrorCodeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ErrorCodeRepository extends JpaRepository<ErrorCodeModel, ErrorCodeId> {
    // 必要に応じてカスタムクエリを定義できます
}
