import { reportAdUrl, reportLocationUrl } from '../../config/apis';
import { Services } from '../../service';
import { reportResponseSchema } from './schema';
import {
  reportAdParamsType,
  reportLocationParamsType,
  reportResponseType,
} from './type';

export * from './type';
export class ReportService extends Services {
  reportAd = async (data: reportAdParamsType): Promise<reportResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof reportResponseSchema,
        reportResponseType
      >({
        method: 'POST',
        url: reportAdUrl,
        schema: reportResponseSchema,
        data,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  reportLocation = async (
    data: reportLocationParamsType
  ): Promise<reportResponseType> => {
    this.abortController = new AbortController();
    try {
      console.log('DATA: ', data);
      const response = await this.fetchApi<
        typeof reportResponseSchema,
        reportResponseType
      >({
        method: 'POST',
        url: reportLocationUrl,
        schema: reportResponseSchema,
        data,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
