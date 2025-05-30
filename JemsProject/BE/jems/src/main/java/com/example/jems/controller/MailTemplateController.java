package com.example.jems.controller;

import com.example.jems.model.MailTemplateSettingModel;
import com.example.jems.service.MailTemplateSettingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/mail-templates")
public class MailTemplateController {

    @Autowired
    private MailTemplateSettingService mailTemplateService;

    /**
     * 全テンプレート取得
     * GET /mail-templates
     */
    @GetMapping
    public List<MailTemplateSettingModel> getAllTemplates() {
        return mailTemplateService.findAll();
    }

    /**
     * テンプレート更新（templateName + locale）
     * PUT /mail-templates/{templateName}?locale=xx
     */
    @PutMapping("/{templateName}")
    public ResponseEntity<MailTemplateSettingModel> updateTemplate(
            @PathVariable String templateName,
            @RequestParam String locale,
            @RequestBody MailTemplateSettingModel updatedTemplate
    ) {
        Optional<MailTemplateSettingModel> updated = mailTemplateService.updateTemplate(templateName, locale, updatedTemplate);
        return updated.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * テンプレートのリロード（仮処理）
     * POST /mail-templates/reload
     */
    @PostMapping("/reload")
    public ResponseEntity<String> reloadTemplates() {
        // 本来はキャッシュなどの再読込処理
        return ResponseEntity.ok("Templates reloaded successfully.");
    }

    /**
     * テンプレートのプレビュー
     * POST /mail-templates/preview
     * リクエストBody: {
     *   "subject": "...",
     *   "body": "...",
     *   "variables": { "name": "John", "date": "2025-04-01" }
     * }
     */
    @PostMapping("/preview")
    public ResponseEntity<Map<String, String>> previewTemplate(@RequestBody Map<String, Object> request) {
        String subject = (String) request.get("subject");
        String body = (String) request.get("body");
        Map<String, String> variables = (Map<String, String>) request.get("variables");

        String renderedSubject = mailTemplateService.renderTemplate(subject, variables);
        String renderedBody = mailTemplateService.renderTemplate(body, variables);

        return ResponseEntity.ok(Map.of(
                "subject", renderedSubject,
                "body", renderedBody
        ));
    }
}
