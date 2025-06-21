import path from "path";
import type { NextConfig } from "next";
import type { Configuration } from "webpack";
import webpack from "webpack";

const nextConfig: NextConfig = {
  // pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  // ✅ pageRouter用

  productionBrowserSourceMaps: true, // ✅ これは既にOK

  images: {
    domains: ["www.j-ems.jp"], // ✅ 外部画像ドメイン設定
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8081/:path*", // 🔁 API プロキシ設定
      },
    ];
  },

  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...(config.resolve?.fallback ?? {}),
          fs: false,
        },
      };

      config.plugins = [
        ...(config.plugins ?? []),
        new webpack.IgnorePlugin({ resourceRegExp: /^fs$/ }), // ❌ fs モジュール無視
      ];

      // winston系のログ関連モジュールはクライアントバンドルから除外
      const additionalExternals = {
        winston: "commonjs winston",
        "winston-daily-rotate-file": "commonjs winston-daily-rotate-file",
        "file-stream-rotator": "commonjs file-stream-rotator",
      };

      config.externals = [
        ...(Array.isArray(config.externals)
          ? config.externals
          : config.externals
            ? [config.externals]
            : []),
        additionalExternals,
      ];
    }

    // ✅ ここから追加（source map のパスを相対にする）
    config.output = {
      ...config.output,
      devtoolModuleFilenameTemplate: (info) =>
        path
          .relative(__dirname, info.absoluteResourcePath)
          .replace(/\\/g, "/"), // Windows対応
    };

    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@composite": path.resolve(__dirname, "src/components/composite"),
        "@base": path.resolve(__dirname, "src/components/base"),
        "@functional": path.resolve(__dirname, "src/components/functional"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@api": path.resolve(__dirname, "src/api"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@config": path.resolve(__dirname, "src/config"),
        "@types": path.resolve(__dirname, "src/types"),
        "@slices": path.resolve(__dirname, "src/slices"),
      },
    };

    return config;
  },
};

export default nextConfig;
