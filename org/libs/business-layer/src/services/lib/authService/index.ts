import { loginUrl, refreshTokenUrl } from '../../config/apis';
import { Services } from '../../service';
import {
  authenticationResponseSchema,
  refreshTokenResponseSchema,
} from './schema';
import {
  loginParamsType,
  tokenType,
  authenticationResponseType,
  refreshTokenResponseType,
} from './type';

export * from './type';
export class AuthService extends Services {
  abortController?: AbortController;

  login = async (
    data: loginParamsType
  ): Promise<authenticationResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof authenticationResponseSchema,
        authenticationResponseType
      >({
        method: 'POST',
        url: loginUrl,
        schema: authenticationResponseSchema,
        data,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
  refreshToken = async (
    refreshToken: tokenType
  ): Promise<refreshTokenResponseType> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof refreshTokenResponseSchema,
        refreshTokenResponseType
      >({
        method: 'POST',
        url: refreshTokenUrl,
        schema: refreshTokenResponseSchema,
        data: { refreshToken },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
