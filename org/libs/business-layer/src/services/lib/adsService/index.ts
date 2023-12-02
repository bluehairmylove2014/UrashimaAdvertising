import { getAllAdsUrl } from '../../config/apis';
import { Services } from '../../service';
import { getAllAdsResponseSchema } from './schema';
import { getAllAdsResponseType } from './type';

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
}
