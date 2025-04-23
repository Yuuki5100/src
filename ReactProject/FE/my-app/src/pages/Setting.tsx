// Setting.tsx
import React from "react";
import { useSetting } from "./useSetting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Setting: React.FC = () => {
  const {
    settings,
    loading,
    updateSetting,
    reloadMailTemplates,
    navigateToErrorCodes
  } = useSetting();

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">設定画面</h1>

      <section>
        <h2 className="text-lg font-semibold">システム設定</h2>
        <div className="space-y-4 mt-4">
          {settings.map((setting) => (
            <div key={setting.key} className="flex items-center gap-4">
              <div className="w-1/3 font-medium">{setting.key}</div>
              <Input
                value={setting.value}
                onChange={(e) => updateSetting(setting.key, e.target.value, false)}
                className="w-1/2"
              />
              <Button onClick={() => updateSetting(setting.key, setting.value, true)}>変更</Button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6">メールテンプレート設定</h2>
        <div className="mt-4">
          <Button onClick={reloadMailTemplates}>テンプレートキャッシュ再読み込み</Button>
        </div>
      </section>

      <section className="pt-6 border-t mt-6">
        <Button variant="outline" onClick={navigateToErrorCodes}>
          ▶ エラーコードの設定変更画面へ
        </Button>
      </section>
    </div>
  );
};

export default Setting;
