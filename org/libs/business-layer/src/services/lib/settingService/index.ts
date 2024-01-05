import {
  getLocationSettingsUrl,
  getAdBoardTypesSettingsUrl,
  getAdFormsSettingsUrl,
  getReportTypesSettingsUrl,
  modifyLocationSettingsUrl,
  modifyAdFormsSettingsUrl,
  modifyAdBoardTypesSettingsUrl,
  modifyReportTypesSettingsUrl,
} from '../../config/apis';
import { Services } from '../../service';
import {
  getAllSettingsResponseSchema,
  modifySettingsResponseSchema,
} from './schema';
import {
  getAllSettingsResponseType,
  getAllSettingsPropsType,
  modifySettingsResponseType,
  modifySettingsPropsType,
} from './type';

export * from './type';
export class SettingService extends Services {
  getLocationSettings = async ({
    token,
  }: getAllSettingsPropsType): Promise<getAllSettingsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getAllSettingsResponseSchema,
          getAllSettingsResponseType
        >({
          method: 'GET',
          url: getLocationSettingsUrl,
          schema: getAllSettingsResponseSchema,
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
  getAdFormsSettings = async ({
    token,
  }: getAllSettingsPropsType): Promise<getAllSettingsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getAllSettingsResponseSchema,
          getAllSettingsResponseType
        >({
          method: 'GET',
          url: getAdFormsSettingsUrl,
          schema: getAllSettingsResponseSchema,
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
  getAdBoardTypesSettings = async ({
    token,
  }: getAllSettingsPropsType): Promise<getAllSettingsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getAllSettingsResponseSchema,
          getAllSettingsResponseType
        >({
          method: 'GET',
          url: getAdBoardTypesSettingsUrl,
          schema: getAllSettingsResponseSchema,
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
  getReportTypesSettings = async ({
    token,
  }: getAllSettingsPropsType): Promise<getAllSettingsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getAllSettingsResponseSchema,
          getAllSettingsResponseType
        >({
          method: 'GET',
          url: getReportTypesSettingsUrl,
          schema: getAllSettingsResponseSchema,
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
  modifyLocationSettings = async ({
    modifyData,
    token,
  }: modifySettingsPropsType): Promise<modifySettingsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof modifySettingsResponseSchema,
          modifySettingsResponseType
        >({
          method: 'PUT',
          url: modifyLocationSettingsUrl,
          schema: modifySettingsResponseSchema,
          data: modifyData,
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
  modifyAdFormsSettings = async ({
    modifyData,
    token,
  }: modifySettingsPropsType): Promise<modifySettingsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof modifySettingsResponseSchema,
          modifySettingsResponseType
        >({
          method: 'PUT',
          url: modifyAdFormsSettingsUrl,
          schema: modifySettingsResponseSchema,
          data: modifyData,
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
  modifyAdBoardTypesSettings = async ({
    modifyData,
    token,
  }: modifySettingsPropsType): Promise<modifySettingsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof modifySettingsResponseSchema,
          modifySettingsResponseType
        >({
          method: 'PUT',
          url: modifyAdBoardTypesSettingsUrl,
          schema: modifySettingsResponseSchema,
          data: modifyData,
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
  modifyReportTypesSettings = async ({
    modifyData,
    token,
  }: modifySettingsPropsType): Promise<modifySettingsResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof modifySettingsResponseSchema,
          modifySettingsResponseType
        >({
          method: 'PUT',
          url: modifyReportTypesSettingsUrl,
          schema: modifySettingsResponseSchema,
          data: modifyData,
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
