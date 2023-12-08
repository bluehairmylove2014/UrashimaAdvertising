import { getLocationGeocoderUrl } from '../../config/apis';
import { Services } from '../../service';
import { getLocationDetailResponseSchema } from './schema';
import {
  getLocationDetailParamsType,
  getLocationDetailResponseType,
} from './type';

export * from './type';
export class GeocodeService extends Services {
  getLocationDetail = async (
    params: getLocationDetailParamsType
  ): Promise<getLocationDetailResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof getLocationDetailResponseSchema,
        getLocationDetailResponseType
      >({
        method: 'GET',
        url: getLocationGeocoderUrl,
        params,
        schema: getLocationDetailResponseSchema,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
