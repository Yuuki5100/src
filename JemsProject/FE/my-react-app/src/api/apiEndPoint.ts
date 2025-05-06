// apiEndPoint.ts
import axiosClient from "../lib/axiosClient";

export type EndpointType =
  | "home"
  | "profile"
  | "settings"
  | "errorcodes"
  | "reload";

const baseUrl = "http://localhost:8080";

export const endpointPaths: Record<EndpointType, string> = {
  home: "/user/home",
  profile: "/user/profile",
  settings: "/user/settings",
  errorcodes: "/user/error-codes",
  reload: "/user/error-codes/reload",
};

export const endpointMethods: Record<EndpointType, "GET" | "POST"> = {
  home: "GET",
  profile: "POST",
  settings: "POST",
  errorcodes: "GET",
  reload: "GET",
};

export const fetchApi = async (endpoint: EndpointType) => {
  const url = baseUrl + endpointPaths[endpoint];
  const method = endpointMethods[endpoint];

  try {
    const response = await axiosClient({
      method,
      url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
