// ErrorCodePage.tsx
import React, { useEffect, useState } from "react";
import { fetchApi, endpointPaths } from "../api/apiEndPoint";
import MainLayout from "../components/layout/MainLayout";
import axiosClient from "../lib/axiosClient";

type ErrorCode = {
  code: string;
  message: string;
  locale: string;
};

const ErrorCodePage = () => {
  const [errorCodes, setErrorCodes] = useState<ErrorCode[]>([]);
  const [newCode, setNewCode] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newLocale, setNewLocale] = useState("");

  useEffect(() => {
    loadErrorCodes();
  }, []);

  const loadErrorCodes = async () => {
    try {
      const data = await fetchApi("errorcodes");
      setErrorCodes(data);
    } catch (error) {
      console.error("データ取得失敗", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axiosClient.post(endpointPaths["errorcodes"], {
        code: newCode,
        message: newMessage,
        locale: newLocale,
      });
      setNewCode("");
      setNewMessage("");
      setNewLocale("");
      loadErrorCodes();
    } catch (error) {
      console.error("追加に失敗しました", error);
    }
  };

  const handleUpdate = async (code: string, message: string, locale: string) => {
    try {
      await axiosClient.put(`${endpointPaths["errorcodes"]}/${code}`, {
        message,
        locale,
      });
      loadErrorCodes();
    } catch (error) {
      console.error("更新に失敗しました", error);
    }
  };

  const handleReload = async () => {
    try {
      await fetchApi("reload");
      loadErrorCodes();
    } catch (error) {
      console.error("キャッシュ再読み込みに失敗しました", error);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">エラーコード編集画面</h1>

        {/* 新規追加 */}
        <div className="mb-10">
          <button onClick={handleAdd} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            新規追加
          </button>
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "50%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="border border-gray-300 p-2">Code</th>
                <th className="border border-gray-300 p-2">Message</th>
                <th className="border border-gray-300 p-2">Locale</th>
                <th className="border border-gray-300 p-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full border rounded px-2"
                    placeholder="E10003"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full border rounded px-2"
                    placeholder="無効なトークンです"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={newLocale}
                    onChange={(e) => setNewLocale(e.target.value)}
                    className="w-full border rounded px-2"
                    placeholder="ja"
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button onClick={handleAdd} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    追加
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 一覧と編集 */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4">一覧と編集</h2>
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "50%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="border border-gray-300 p-2">Code</th>
                <th className="border border-gray-300 p-2">Message</th>
                <th className="border border-gray-300 p-2">Locale</th>
                <th className="border border-gray-300 p-2">編集</th>
              </tr>
            </thead>
            <tbody>
              {errorCodes.map((err, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{err.code}</td>
                  <td className="border border-gray-300 p-2">{err.message}</td>
                  <td className="border border-gray-300 p-2">{err.locale}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleUpdate(err.code, err.message, err.locale)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      変更
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* キャッシュ再読み込み */}
        <div className="mt-6">
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            キャッシュ再読み込み
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ErrorCodePage;
