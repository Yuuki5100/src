import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import jest from "eslint-plugin-jest";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ⛔️ 無視対象
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "dist/**",
      "coverage/**",
      "**/*.config.js",
      "**/*.config.mjs",
    ],
  },

  // ✅ Next.js + TypeScript 基本設定
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ 通常コード向けルール
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "error",
    },
  },

  // ✅ テスト用ルールセット（pluginはオブジェクト形式で渡す）
  {
    files: ["**/__tests__/**/*.{ts,tsx}", "**/?(*.)+(spec|test).{ts,tsx}"],
    plugins: {
      jest,
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    rules: {
      "jest/expect-expect": "warn",
      "testing-library/no-unnecessary-act": "warn",
      "jest-dom/prefer-checked": "warn",
      "no-console": "off",
    },
  },
];
