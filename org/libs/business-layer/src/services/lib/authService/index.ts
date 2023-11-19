import { loginUrl, refreshTokenUrl, registerUrl } from "../../config/apis";
import { Services } from "../../service";
import {
  authenticationResponseSchema,
  refreshTokenResponseSchema,
} from "./schema";
import {
  LoginParams,
  RegisterParams,
  Token,
  AuthenticationResponse,
  RefreshTokenResponse,
} from "./type";

export * from "./type";
export class AuthService extends Services {
  abortController?: AbortController;

  register = async (data: RegisterParams): Promise<AuthenticationResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof authenticationResponseSchema,
        AuthenticationResponse
      >({
        method: "POST",
        url: registerUrl,
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
  login = async (data: LoginParams): Promise<AuthenticationResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof authenticationResponseSchema,
        AuthenticationResponse
      >({
        method: "POST",
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
  refreshToken = async (refreshToken: Token): Promise<RefreshTokenResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof refreshTokenResponseSchema,
        RefreshTokenResponse
      >({
        method: "POST",
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
