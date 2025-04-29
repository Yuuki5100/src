// // Setting.tsx
// import React, { useState } from "react";
// import { Button, Input } from "@mui/material";
// import { useRouter } from "next/router";
// import { useFetch, useApiMutation } from "@/hooks/useApi";
// import { API_ENDPOINTS } from "@/api/apiEndpoints";

// // 型定義（レスポンス全体の型）
// type SettingType = {
//   data: Setting[];
//   success: boolean;
//   error: Error;
// }

// // 型定義（Settingの型を明確に）
// type Setting = {
//   item: string;
//   value: string;
// };

// const Setting: React.FC = () => {
//   const router = useRouter();

//   // 初期データ取得 (fetchSettingsではなく useFetch)
//   const { data: SettingFetchType, isLoading, error } = useFetch<SettingType>(
//     "settings",
//     API_ENDPOINTS.SETTINGS.GET_SETTINGS
//   );

//   // reloadMailTemplatesとupdateSettingをuseApiMutationで
//   const { mutate: reloadMailTemplates } = useApiMutation<unknown, {}>("post", API_ENDPOINTS.MAIL_TEMPLATES.RELOAD);
//   const { mutate: updateSettingMutation } = useApiMutation<unknown, { item: string; value: string }>(
//     "put",
//     API_ENDPOINTS.SETTINGS.PUT_SETTING
//   );

//   // Local stateで編集中の値を管理する
//   const [editedValues, setEditedValues] = useState<Record<string, string>>({});

//   const handleReload = () => {
//     reloadMailTemplates({}, {
//       onSuccess: () => {
//         alert("テンプレートキャッシュを再読み込みしました");
//       },
//       onError: () => {
//         alert("リロードに失敗しました");
//       },
//     });
//   };

//   const handleUpdate = (key: string) => {
//     const value = editedValues[key] ?? SettingFetchType?.data.find(s => s.item === key)?.value;
//     if (!value) {
//       alert("値が空です");
//       return;
//     }
//     updateSettingMutation(
//       { item:key, value },
//       {
//         onSuccess: () => {
//           alert("設定を更新しました");
//         },
//         onError: () => {
//           alert("更新に失敗しました");
//         },
//       }
//     );
//   };

//   const handleChange = (key: string, value: string) => {
//     if (!key) {
//       console.error("Invalid key:", key);  // keyが無効な場合にエラーをログに出力
//       return;
//     }
//     setEditedValues((prev) => ({ ...prev, [key]: value }));
//   };

//   const navigateToErrorCodes = () => {
//     router.push("/error-codes");
//   };

//   if (isLoading) return <div>読み込み中...</div>;
//   if (error) return <div>エラーが発生しました</div>;
//   if (!SettingFetchType?.data) {
//     return <div>設定が読み込まれていません</div>;
//   }

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-6">
//       <h1 className="text-2xl font-bold">設定画面</h1>

//       <section>
//         <h2 className="text-lg font-semibold">システム設定</h2>
//         <div className="space-y-4 mt-4">
//           {/* {SettingFetchType?.data.map((setting) => (
//             <div key={setting.key} className="flex items-center gap-4">
//               <div className="w-1/3 font-medium">{setting.key}</div>
//               <Input
//                 value={editedValues[setting.key] ?? setting.value}
//                 onChange={(e) => handleChange(setting.key, e.target.value)}
//                 className="w-1/2"
//               />
//               <Button onClick={() => handleUpdate(setting.key)}>変更</Button>
//             </div>
//           ))} */}
//           {SettingFetchType?.data.map((setting, index) => (
//             <div key={`${setting.item}-${index}`} className="flex items-center gap-4">
//               {/* ラベル追加部分 */}
//               <span className="w-1/3 font-medium">{setting.item}</span>

//               {/* 入力フィールド */}
//               <Input
//                 value={editedValues[setting.item] ?? setting.value ?? ''}
//                 onChange={(e) => handleChange(setting.item, e.target.value)}
//                 className="w-1/2"
//               />

//               {/* 更新ボタン */}
//               <Button onClick={() => handleUpdate(setting.item)}>変更</Button>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-lg font-semibold mt-6">メールテンプレート設定</h2>
//         <div className="mt-4">
//           <Button onClick={handleReload}>テンプレートキャッシュ再読み込み</Button>
//         </div>
//       </section>

//       <section className="pt-6 border-t mt-6">
//         <Button variant="outlined" onClick={navigateToErrorCodes}>
//           ▶ エラーコードの設定変更画面へ
//         </Button>
//       </section>
//     </div>
//   );
// };

// export default Setting;
