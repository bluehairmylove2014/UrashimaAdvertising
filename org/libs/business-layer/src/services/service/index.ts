import { ZodSchema } from 'zod';
import {
  axios,
  getAxiosNormalInstance,
  isAxiosError,
  isCancel,
} from '../config/axios';
import { getApiUrl } from '../config/url';
console.log('GENERATE');
const unknownError: string = 'Unexpected error occurred';
export class Services {
  abortController?: AbortController;

  cancelRequest(): void {
    this.abortController && this.abortController.abort();
  }

  handleError(error: any): Error {
    console.error('service error: ', error);
    if (isCancel(error)) {
      this.cancelRequest();
      return error;
    }
    return new Error(
      isAxiosError(error)
        ? error?.response?.data?.message ?? unknownError
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
    isUseProxy,
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
    isUseProxy?: boolean;
    withCredentials?: boolean;
  }): Promise<any> {
    const mockParams = {
      method,
      url: isUseProxy ? url : getApiUrl(isProduction) + url,
      data,
      params,
      headers,
      signal,
      withCredentials,
    };
    window && window.addEventListener('beforeunload', this.cancelRequest);
    const response = await (!isProduction
      ? axios(mockParams)
      : getAxiosNormalInstance()(mockParams));
    const dataResponse = schema.parse(response.data);
    window && window.removeEventListener('beforeunload', this.cancelRequest);
    return transformResponse ? transformResponse(dataResponse) : dataResponse;
  }
}
