import { AxiosResponse } from 'axios';
import {
  facebookGetFBAccessTokenUrl,
  facebookGetFBUserInfoUrl,
  googleGetUserInfoUrl,
  googleValidateTokenUrl,
  updateAccountUrl,
} from '../../config/apis';
import { getAxiosNormalInstance } from '../../config/axios';
import { Services } from '../../service';
import { updateAccountResponseSchema } from './schema';
import {
  GetFBAccessTokenParams,
  GetFBAccessTokenResponse,
  GetFBUserInfoResponse,
  GetUserInfoResponse,
  GoogleGetUserInfoResponse,
  GoogleValidateTokenResponse,
  Token,
  UpdateAccountParams,
  UpdateAccountResponse,
  ValidateTokenResponse,
} from './type';

export class SocialService extends Services {
  abortController?: AbortController;

  // GOOGLE LOGIN
  validateToken = async (token: string): Promise<ValidateTokenResponse> => {
    this.abortController = new AbortController();
    try {
      const response: AxiosResponse<GoogleValidateTokenResponse> =
        await getAxiosNormalInstance().get(
          googleValidateTokenUrl + `?access_token=${token}`,
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
        throw new Error('Error validate token response.status not valid');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getAccountInfo = async (token: string): Promise<GetUserInfoResponse> => {
    this.abortController = new AbortController();
    try {
      const response: AxiosResponse<GoogleGetUserInfoResponse> =
        await getAxiosNormalInstance().get(googleGetUserInfoUrl, {
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
        throw new Error('Error fetching user profile');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  updateAccount = async (
    data: UpdateAccountParams
  ): Promise<UpdateAccountResponse> => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi<
        typeof updateAccountResponseSchema,
        UpdateAccountResponse
      >({
        method: 'POST',
        url: updateAccountUrl,
        schema: updateAccountResponseSchema,
        data,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
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
          facebookGetFBAccessTokenUrl +
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
        throw new Error('Error fetching access token');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
  getFBUserInfo = async (token: Token): Promise<GetUserInfoResponse> => {
    this.abortController = new AbortController();
    try {
      const response: AxiosResponse<GetFBUserInfoResponse> =
        await getAxiosNormalInstance().get(
          facebookGetFBUserInfoUrl + `&access_token=${token}`,
          {
            signal: this.abortController.signal,
          }
        );
      if (response.status === 200) {
        // Token is valid
        return {
          email: response.data.email,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
        };
      } else {
        throw new Error('Error get facebook user infor response.status');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
