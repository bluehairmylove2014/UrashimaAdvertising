import { getRegionsUrl } from '../../config/apis';
import { Services } from '../../service';
import { regionResponseSchema } from './schema';
import { regionResponseType } from './type';

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
}
