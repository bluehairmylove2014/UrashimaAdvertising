import { ZodSchema } from "zod";
import {
  axios,
  getAxiosNormalInstance,
  isAxiosError,
  isCancel,
} from "../config/axios";
import { getApiUrl } from "../config/url";

const unknownError: string = "Unexpected error occurred";
export class Services {
  abortController?: AbortController;
  axios: any;
  productionAxios: any;

  constructor() {
    this.axios = axios;
    this.productionAxios = getAxiosNormalInstance();
  }

  isCancel(error: any): boolean {
    return isCancel(error);
  }

  cancelRequest(): void {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  handleError(error: any): Error {
    console.error("service error: ", error);
    if (this.isCancel(error)) {
      this.cancelRequest();
      return error;
    }
    return new Error(
      isAxiosError(error)
        ? error?.response?.data?.message || unknownError
        : unknownError
    );
  }

  async fetchApi<U extends ZodSchema<any>, T>({
    method,
    url,
    schema,
    params,
    data,
    headers = {},
    signal,
    transformResponse,
    isProduction,
    withCredentials = false,
  }: {
    method: string;
    url: string;
    schema: U;
    params?: any;
    data?: any;
    headers?: any;
    signal: AbortSignal;
    transformResponse: (res: T) => void;
    isProduction?: boolean;
    withCredentials?: boolean;
  }): Promise<any> {
    const mockParams = {
      method,
      url: getApiUrl(isProduction) + url,
      data,
      params,
      headers,
      signal,
      withCredentials,
    };
    const response = await (!isProduction
      ? this.axios(mockParams)
      : this.productionAxios(mockParams));

    const dataResponse = schema.parse(response.data);
    return transformResponse ? transformResponse(dataResponse) : dataResponse;
  }
}
