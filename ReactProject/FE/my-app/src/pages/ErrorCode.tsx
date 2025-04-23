// ErrorCode.tsx
import React from "react";
import { useErrorCode } from "./useErrorCode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

const ErrorCode: React.FC = () => {
  const {
    code,
    message,
    locale,
    setCode,
    setMessage,
    setLocale,
    addErrorCode,
    errorCodes,
    updateErrorCode,
  } = useErrorCode();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">エラーコード編集画面</h1>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">新規追加</h2>
        <div className="grid grid-cols-4 gap-2 items-center">
          <Input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
          <Input placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <Input placeholder="Locale" value={locale} onChange={(e) => setLocale(e.target.value)} />
          <Button onClick={addErrorCode}>追加</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">一覧と編集</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Locale</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errorCodes.map((err, index) => (
              <TableRow key={`${err.code}-${err.locale}-${index}`}>
                <TableCell>{err.code}</TableCell>
                <TableCell>{err.message}</TableCell>
                <TableCell>{err.locale}</TableCell>
                <TableCell>
                  <Button onClick={() => updateErrorCode(err)}>変更</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ErrorCode;