import {
  getApproveListUrl,
  createNewAdBoardApproveRequestUrl,
  createNewAdLocationApproveRequestUrl,
} from '../../config/apis';
import { Services } from '../../service';
import {
  createNewApproveRequestResponseSchema,
  getApproveListResponseSchema,
} from './schema';
import {
  getApproveListResponseType,
  createNewAdBoardApproveRequestParamsType,
  createNewApproveRequestResponseType,
  createNewAdLocationApproveRequestParamsType,
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
  requestAdLocationApprove = async ({
    approveData,
    token,
  }: createNewAdLocationApproveRequestParamsType): Promise<createNewApproveRequestResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof createNewApproveRequestResponseSchema,
          createNewAdLocationApproveRequestParamsType
        >({
          method: 'POST',
          url: createNewAdLocationApproveRequestUrl,
          schema: createNewApproveRequestResponseSchema,
          data: approveData,
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
