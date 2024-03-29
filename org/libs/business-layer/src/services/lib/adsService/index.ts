import { getRegionsFromCookie } from '@business-layer/business-logic/lib/regionManagement/process/helpers/regionsCookie';
import {
  HQCreateNewAdsEndpoint,
  adsPointModificationUrl,
  getAdDetailsUrl,
  getAllAdBoardsUrl,
  getAllAdsUrl,
  getAllOfficerAdsUrl,
  getOfficerAdDetailAdsUrl,
} from '../../config/apis';
import { Services } from '../../service';
import {
  adsPointModificationSchema,
  anySchema,
  getAdDetailResponseSchema,
  getAllAdBoardsResponseSchema,
  getAllAdsResponseSchema,
  getAllOfficerAdsResponseSchema,
  getOfficerAdDetailResponseSchema,
  hqCreateNewAdsSchema,
} from './schema';
import {
  adsPointModificationParamsType,
  adsPointModificationResponseType,
  getAdDetailParamsType,
  getAdDetailResponseType,
  getAllAdBoardsResponseType,
  getAllAdsResponseType,
  getAllOfficerAdsResponseType,
  getOfficerLocationDetailAdsResponseType,
  hqCreateNewAdsParamsType,
  hqCreateNewAdsResponseType,
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

  getAllOfficerAds = async (
    token: string | null
  ): Promise<getAllOfficerAdsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getAllOfficerAdsResponseSchema,
          getAllOfficerAdsResponseType
        >({
          method: 'GET',
          url: getAllOfficerAdsUrl,
          schema: getAllOfficerAdsResponseSchema,
          headers: {
            Authorization: `Bearer ${token}`,
            Regions: encodeURIComponent(getRegionsFromCookie() || ''),
          },
          signal: this.abortController.signal,
          transformResponse: (res) => res,
        });
        return response;
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getAllOfficerAdBoards = async (
    token: string | null
  ): Promise<getAllAdBoardsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof anySchema,
          getAllAdBoardsResponseType
        >({
          method: 'GET',
          url: getAllAdBoardsUrl,
          schema: anySchema,
          headers: {
            Authorization: `Bearer ${token}`,
            Regions: encodeURIComponent(getRegionsFromCookie() || ''),
          },
          signal: this.abortController.signal,
          transformResponse: (res) => res,
        });
        return response;
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getOfficerLocationDetail = async ({
    adId,
    token,
  }: getAdDetailParamsType): Promise<getOfficerLocationDetailAdsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
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
          headers: {
            Authorization: `Bearer ${token}`,
            Regions: encodeURIComponent(getRegionsFromCookie() || ''),
          },
          signal: this.abortController.signal,
          transformResponse: (res) => res,
        });
        return response;
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  adsPointModification = async (
    data: adsPointModificationParamsType
  ): Promise<adsPointModificationResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof adsPointModificationSchema,
        adsPointModificationResponseType
      >({
        method: 'POST',
        url: adsPointModificationUrl,
        schema: adsPointModificationSchema,
        data: data.modificationData,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  hqCreateNewAds = async ({
    data,
    token,
  }: hqCreateNewAdsParamsType): Promise<hqCreateNewAdsResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof hqCreateNewAdsSchema,
        hqCreateNewAdsResponseType
      >({
        method: 'POST',
        url: HQCreateNewAdsEndpoint,
        schema: hqCreateNewAdsSchema,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
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
