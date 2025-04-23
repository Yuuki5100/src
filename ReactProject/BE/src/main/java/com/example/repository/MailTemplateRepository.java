package com.example.repository;

import com.example.demo.model.MailTemplateModel;
import com.example.demo.model.MailTemplateId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MailTemplateRepository extends JpaRepository<MailTemplateModel, MailTemplateId> {
    // 必要に応じてカスタムメソッドを定義できます
}
