// MailTemplete.tsx
import React from "react";
import { useMailTemplete } from "./useMailTemplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";

const MailTemplete: React.FC = () => {
  const {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    locales,
    selectedLocale,
    setSelectedLocale,
    subject,
    setSubject,
    body,
    setBody,
    saveTemplate,
    reloadTemplates,
    previewTemplate
  } = useMailTemplete();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">メールテンプレート編集画面</h1>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium">テンプレート選択:</label>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            {templates.map(tpl => (
              <SelectItem key={tpl} value={tpl}>{tpl}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex-1">
          <label className="block font-medium">ロケール:</label>
          <Select value={selectedLocale} onValueChange={setSelectedLocale}>
            {locales.map(loc => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <label className="block font-medium">件名:</label>
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>

      <div>
        <label className="block font-medium">本文 (HTML + {{ 変数 }} 埋め込み):</label>
        <Textarea rows={10} value={body} onChange={(e) => setBody(e.target.value)} />
      </div>

      <div className="flex gap-4 pt-4">
        <Button onClick={saveTemplate}>保存</Button>
        <Button onClick={reloadTemplates}>キャッシュ再読み込み</Button>
        <Button variant="outline" onClick={previewTemplate}>プレビュー ▶</Button>
      </div>
    </div>
  );
};

export default MailTemplete;
