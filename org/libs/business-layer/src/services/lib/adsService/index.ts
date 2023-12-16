import {
  getAdDetailsUrl,
  getAllAdsUrl,
  getAllOfficerAdsUrl,
  getOfficerAdDetailAdsUrl,
} from '../../config/apis';
import { Services } from '../../service';
import {
  getAdDetailResponseSchema,
  getAllAdsResponseSchema,
  getAllOfficerAdsResponseSchema,
  getOfficerAdDetailResponseSchema,
} from './schema';
import {
  getAdDetailResponseType,
  getAllAdsResponseType,
  getAllOfficerAdsResponseType,
  getOfficerLocationDetailAdsResponseType,
} from './type';

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

  getAllOfficerAds = async (): Promise<getAllOfficerAdsResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof getAllOfficerAdsResponseSchema,
        getAllOfficerAdsResponseType
      >({
        method: 'GET',
        url: getAllOfficerAdsUrl,
        schema: getAllOfficerAdsResponseSchema,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getOfficerLocationDetail = async (
    adId: number
  ): Promise<getOfficerLocationDetailAdsResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof getOfficerAdDetailResponseSchema,
        getOfficerLocationDetailAdsResponseType
      >({
        method: 'GET',
        url: getOfficerAdDetailAdsUrl,
        schema: getOfficerAdDetailResponseSchema,
        params: {
          id: adId,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      console.log('FUCCKING ERRORRRR: ', error);
      throw this.handleError(error);
    }
  };
}
