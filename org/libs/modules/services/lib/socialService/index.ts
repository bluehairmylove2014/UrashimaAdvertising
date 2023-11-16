import { AxiosResponse } from "axios";
import { updateAccountUrl } from "../../config/apis";
import { getAxiosNormalInstance, isAxiosError } from "../../config/axios";
import { googleApiConfig, facebookApiConfig } from "../../config/config";
import { Services } from "../../service";
import { updateAccountResponseSchema } from "./schema";
import {
  GetFBAccessTokenParams,
  GetFBAccessTokenResponse,
  GetUserInforResponse,
  GoogleGetUserInfoResponse,
  GoogleValidateTokenResponse,
  Token,
  UpdateAccountParams,
  UpdateAccountResponse,
  ValidateTokenResponse,
} from "./type";

export class SocialService extends Services {
  abortController?: AbortController;

  // GOOGLE LOGIN
  validateToken = async (token: string): Promise<ValidateTokenResponse> => {
    this.abortController = new AbortController();
    try {
      const response: AxiosResponse<GoogleValidateTokenResponse> =
        await getAxiosNormalInstance().get(
          googleApiConfig.validateTokenUrl + `?access_token=${token}`,
          {
            signal: this.abortController.signal,
          }
        );
      if (response.status === 200) {
        // Token is valid
        return {
          email: response.data.email,
          email_verified: response.data.email_verified,
          expires_in: response.data.expires_in,
        };
      } else {
        throw new Error("Error validate token response.status not valid");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getAccountInfor = async (token: string): Promise<GetUserInforResponse> => {
    this.abortController = new AbortController();
    try {
      const response: AxiosResponse<GoogleGetUserInfoResponse> =
        await getAxiosNormalInstance().get(googleApiConfig.getUserInforUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: this.abortController.signal,
        });
      if (response.status === 200) {
        const userProfile = response.data;
        return {
          email: userProfile.emailAddresses[0].value,
          firstName: userProfile.names[0].familyName,
          lastName: userProfile.names[0].givenName,
        };
      } else {
        throw new Error("Error fetching user profile");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  updateAccount = async (data: UpdateAccountParams): Promise<string> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof updateAccountResponseSchema,
        UpdateAccountResponse
      >({
        method: "POST",
        url: updateAccountUrl,
        schema: updateAccountResponseSchema,
        data,
        signal: this.abortController.signal,
        transformResponse: (res) => res.token,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  };

  // FACEBOOK LOGIN
  getFBAccessToken = async (
    params: GetFBAccessTokenParams
  ): Promise<GetFBAccessTokenResponse> => {
    this.abortController = new AbortController();
    try {
      const response: AxiosResponse<GetFBAccessTokenResponse> =
        await getAxiosNormalInstance().get(
          facebookApiConfig.getFBAccessTokenUrl +
            `?client_id=${params.clientId}` +
            `&client_secret=${params.clientSecret}` +
            `&redirect_uri=${params.redirectUri}` +
            `&code=${params.code}`,
          {
            signal: this.abortController.signal,
          }
        );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error fetching access token");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getFBUserInfor = async (token: Token): Promise<GetUserInforResponse> => {
    this.abortController = new AbortController();
    try {
      const response: AxiosResponse<GetUserInforResponse> =
        await getAxiosNormalInstance().get(
          facebookApiConfig.getFBUserInforUrl + `&access_token=${token}`,
          {
            signal: this.abortController.signal,
          }
        );
      if (response.status === 200) {
        // Token is valid
        return response.data;
      } else {
        throw new Error("Error get facebook user infor response.status");
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
