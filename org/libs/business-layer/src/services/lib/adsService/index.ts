import { getAdDetailsUrl, getAllAdsUrl } from '../../config/apis';
import { Services } from '../../service';
import { getAdDetailResponseSchema, getAllAdsResponseSchema } from './schema';
import { getAdDetailResponseType, getAllAdsResponseType } from './type';

export * from './type';
export class AdsService extends Services {
  getAllAds = async (): Promise<getAllAdsResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof getAllAdsResponseSchema,
        getAllAdsResponseType
      >({
        method: 'GET',
        url: getAllAdsUrl,
        schema: getAllAdsResponseSchema,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getAdDetail = async (adId: number): Promise<getAdDetailResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof getAdDetailResponseSchema,
        getAdDetailResponseType
      >({
        method: 'GET',
        url: getAdDetailsUrl,
        schema: getAdDetailResponseSchema,
        params: {
          id: adId,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
