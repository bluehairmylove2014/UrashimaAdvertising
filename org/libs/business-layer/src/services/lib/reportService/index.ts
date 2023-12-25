import {
  editReportUrl,
  getAllOfficerReportsUrl,
  reportAdUrl,
  reportLocationUrl,
} from '../../config/apis';
import { Services } from '../../service';
import { getAllOfficerAdsResponseType } from '../adsService';
import {
  getAllOfficerReportsResponseSchema,
  getOfficerReportDetailResponseSchema,
  reportResponseSchema,
} from './schema';
import {
  editReportParamsType,
  editReportResponseType,
  getAllOfficerReportsResponseType,
  getOfficerReportDetailResponseType,
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
  getAllOfficerReport = async (
    token: string | null
  ): Promise<getAllOfficerReportsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getAllOfficerReportsResponseSchema,
          getAllOfficerAdsResponseType
        >({
          method: 'GET',
          url: getAllOfficerReportsUrl,
          schema: getAllOfficerReportsResponseSchema,
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
  getOfficerReportDetail = async (
    id: number,
    token: string | null
  ): Promise<getOfficerReportDetailResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getOfficerReportDetailResponseSchema,
          getOfficerReportDetailResponseType
        >({
          method: 'GET',
          url: getAllOfficerReportsUrl,
          schema: getOfficerReportDetailResponseSchema,
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
  officerEditReport = async (
    data: editReportParamsType
  ): Promise<editReportResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof reportResponseSchema,
        editReportResponseType
      >({
        method: 'PUT',
        url: editReportUrl,
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
