import { createNewRegionsUrl, getRegionsUrl } from '../../config/apis';
import { Services } from '../../service';
import { anySchema } from '../adsService/schema';
import { addRegionResponseSchema, regionResponseSchema } from './schema';
import {
  addRegionParamsType,
  addRegionResponseType,
  regionResponseType,
} from './type';

export * from './type';
export class RegionService extends Services {
  getRegions = async (token: string | null): Promise<regionResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof regionResponseSchema,
          regionResponseType
        >({
          method: 'GET',
          url: getRegionsUrl,
          schema: regionResponseSchema,

          headers: {
            Authorization: `Bearer ${token}`,
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
  addRegions = async ({
    data,
    token,
  }: addRegionParamsType): Promise<addRegionResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof addRegionResponseSchema,
          addRegionResponseType
        >({
          method: 'POST',
          url: createNewRegionsUrl,
          schema: addRegionResponseSchema,
          data,
          headers: {
            Authorization: `Bearer ${token}`,
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
  removeRegions = async ({
    id,
    token,
  }: {
    id: number;
    token: string | null;
  }): Promise<{ message: string }> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof anySchema,
          { message: string }
        >({
          method: 'DELETE',
          url: createNewRegionsUrl,
          schema: anySchema,
          params: {
            id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
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
}
