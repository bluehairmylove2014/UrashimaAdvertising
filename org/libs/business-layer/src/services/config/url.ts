import { isDevelopment } from "./axios";
import { authServiceConfig } from "./config";

const serverApi = "http://localhost:2014/api";
const localApi = "http://localhost:2808/api";

export const getApiUrl = (isProduction?: boolean) => {
  return isProduction
    ? serverApi
    : isDevelopment() && authServiceConfig.isMockApi
    ? localApi
    : serverApi;
};
