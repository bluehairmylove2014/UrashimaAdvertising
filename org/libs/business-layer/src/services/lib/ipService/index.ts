import { AxiosResponse } from 'axios';
import { getCurrentLocationUrl } from '../../config/apis';
import { Services } from '../../service';
import { getCurrentLocationResponseSchema } from './schema';
import { getCurrentLocationResponse } from './type';
import { getAxiosNormalInstance } from '@business-layer/services/config/axios';

export * from './type';
export class IPService extends Services {
  getCurrentLocation = async (): Promise<getCurrentLocationResponse> => {
    this.abortController = new AbortController();
    try {
      console.log('CALL API GET LOCATION: ', getCurrentLocationUrl);
      // const response = await this.fetchApi<
      //   typeof getCurrentLocationResponseSchema,
      //   getCurrentLocationResponse
      // >({
      //   method: 'GET',
      //   url: getCurrentLocationUrl,
      //   schema: getCurrentLocationResponseSchema,
      //   signal: this.abortController.signal,
      //   headers: {
      //     Origin: window.location.href,
      //   },
      //   isUseProxy: true,
      //   transformResponse: (res) => res,
      // });

      const response: AxiosResponse<getCurrentLocationResponse> =
        await getAxiosNormalInstance().get(getCurrentLocationUrl, {
          signal: this.abortController.signal,
        });
      console.log('response: ', response);
      if (response?.data?.lat && response?.data?.lon) {
        return response.data;
      } else {
        throw this.handleError('Request failed');
      }
    } catch (error) {
      console.log('error: ', error);
      throw this.handleError(error);
    }
  };
}
