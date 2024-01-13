import { getRegionsFromCookie } from '@business-layer/business-logic/lib/regionManagement/process/helpers/regionsCookie';
import {
  getApproveListUrl,
  createNewAdBoardApproveRequestUrl,
  deleteApproveUrl,
  approveAdModificationRequestEndpoint,
  getAllAdModificationRequestEndpoint,
  approveAdCreationRequestEndpoint,
  deleteModificationRequestUrl,
} from '../../config/apis';
import { Services } from '../../service';
import {
  approveAdCreationRequestResponseSchema,
  approveAdModificationRequestResponseSchema,
  createNewApproveRequestResponseSchema,
  deleteApproveRequestResponseSchema,
  getAllAdModificationRequestResponseSchema,
  getApproveListResponseSchema,
} from './schema';
import {
  getApproveListResponseType,
  createNewAdBoardApproveRequestParamsType,
  createNewApproveRequestResponseType,
  deleteApproveRequestParamsType,
  deleteApproveRequestResponseType,
  getAllAdModificationRequestResponseType,
  approveAdModificationRequestParamsType,
  approveAdModificationRequestResponseType,
  approveAdCreationRequestResponseType,
  approveAdCreationRequestParamsType,
} from './type';

export * from './type';
export class ApproveService extends Services {
  getApproveList = async (
    token: string | null
  ): Promise<getApproveListResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getApproveListResponseSchema,
          getApproveListResponseType
        >({
          method: 'GET',
          url: getApproveListUrl,
          schema: getApproveListResponseSchema,
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
  requestAdBoardApprove = async ({
    approveData,
    token,
  }: createNewAdBoardApproveRequestParamsType): Promise<createNewApproveRequestResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof createNewApproveRequestResponseSchema,
          createNewApproveRequestResponseType
        >({
          method: 'POST',
          url: createNewAdBoardApproveRequestUrl,
          schema: createNewApproveRequestResponseSchema,
          data: approveData,
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
  deleteApproveRequest = async ({
    id,
    token,
  }: deleteApproveRequestParamsType): Promise<deleteApproveRequestResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof deleteApproveRequestResponseSchema,
          deleteApproveRequestResponseType
        >({
          method: 'DELETE',
          url: deleteApproveUrl,
          schema: deleteApproveRequestResponseSchema,
          params: { id },
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
  deleteModificationRequest = async ({
    id,
    token,
  }: deleteApproveRequestParamsType): Promise<deleteApproveRequestResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof deleteApproveRequestResponseSchema,
          deleteApproveRequestResponseType
        >({
          method: 'DELETE',
          url: deleteModificationRequestUrl,
          schema: deleteApproveRequestResponseSchema,
          params: { id },
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

  getAllAdModificationRequest = async (
    token: string | null
  ): Promise<getAllAdModificationRequestResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getAllAdModificationRequestResponseSchema,
          getAllAdModificationRequestResponseType
        >({
          method: 'GET',
          url: getAllAdModificationRequestEndpoint,
          schema: getAllAdModificationRequestResponseSchema,
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
  approveAdModificationRequest = async ({
    data,
    token,
  }: {
    data: approveAdModificationRequestParamsType;
    token: string | null;
  }): Promise<approveAdModificationRequestResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof approveAdModificationRequestResponseSchema,
          approveAdModificationRequestResponseType
        >({
          method: 'POST',
          url: approveAdModificationRequestEndpoint,
          schema: approveAdModificationRequestResponseSchema,
          data: data,
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
  approveAdCreationRequest = async ({
    data,
    token,
  }: {
    data: approveAdCreationRequestParamsType;
    token: string | null;
  }): Promise<approveAdCreationRequestResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof approveAdCreationRequestResponseSchema,
          approveAdCreationRequestResponseType
        >({
          method: 'POST',
          url: approveAdCreationRequestEndpoint,
          schema: approveAdCreationRequestResponseSchema,
          data: data,
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
}
