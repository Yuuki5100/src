package com.example.jems.repository;

import com.example.jems.model.MailTemplateSettingModel;
import com.example.jems.model.MailTemplateId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MailTemplateSettingRepository extends JpaRepository<MailTemplateSettingModel, MailTemplateId> {
    // 必要に応じてカスタムメソッドを定義できます
}
