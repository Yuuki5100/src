package com.example.jems.service;

import com.example.jems.model.MailTemplateId;
import com.example.jems.model.MailTemplateSettingModel;
import com.example.jems.repository.MailTemplateSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class MailTemplateSettingService {

    @Autowired
    private MailTemplateSettingRepository mailTemplateRepository;

    /**
     * 全件取得
     */
    public List<MailTemplateSettingModel> findAll() {
        return mailTemplateRepository.findAll();
    }

    /**
     * Insert または Update（save は両方対応）
     */
    public MailTemplateSettingModel saveOrUpdate(MailTemplateSettingModel template) {
        return mailTemplateRepository.save(template);
    }

    /**
     * 更新（templateName + locale を検索条件）
     */
    public Optional<MailTemplateSettingModel> updateTemplate(String templateName, String locale, MailTemplateSettingModel updatedData) {
        MailTemplateId id = new MailTemplateId(templateName, locale);
        Optional<MailTemplateSettingModel> optional = mailTemplateRepository.findById(id);

        if (optional.isPresent()) {
            MailTemplateSettingModel template = optional.get();
            template.setSubject(updatedData.getSubject());
            template.setBody(updatedData.getBody());
            return Optional.of(mailTemplateRepository.save(template));
        } else {
            return Optional.empty();
        }
    }

    /**
     * テンプレート文字列の変数置換 (例: {{name}} → "John")
     */
    public String renderTemplate(String template, Map<String, String> variables) {
        if (template == null || variables == null) return template;

        Pattern pattern = Pattern.compile("\\{\\{\\s*(\\w+)\\s*}}");
        Matcher matcher = pattern.matcher(template);
        StringBuffer sb = new StringBuffer();

        while (matcher.find()) {
            String key = matcher.group(1);
            String value = variables.getOrDefault(key, "");
            matcher.appendReplacement(sb, Matcher.quoteReplacement(value));
        }
        matcher.appendTail(sb);
        return sb.toString();
    }
}
