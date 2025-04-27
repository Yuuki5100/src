// apiEndpoint.ts

import axiosClient from "../lib/axiosClient";

type EndpointType = "home" | "profile" | "settings";

const baseUrl = "http://localhost:8080"; // バックエンドの基本URL

// 各エンドポイントのパスを管理するオブジェクト
const endpointPaths: Record<EndpointType, string> = {
  home: "/user/home",
  profile: "/user/profile",
  settings: "/user/settings",
};

// リクエストを投げる関数
export const fetchApi = async (endpoint: EndpointType) => {
  const url = baseUrl + endpointPaths[endpoint]; // エンドポイントURLを決定
  const method = endpoint === "home" ? "GET" : "POST"; // 例として、homeはGET、それ以外はPOST

  try {
    const response = await axiosClient({
      method, 
      url, 
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    return response.data; // axiosのレスポンスは response.data に格納されている
  } catch (error) {
    console.error(error);
    throw error;
  }
};