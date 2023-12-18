import { getAccountInfoUrl } from '../../config/apis';
import { Services } from '../../service';
import { getAccountInfoResponseSchema } from './schema';
import { getAccountInfoResponseType } from './type';

export * from './type';
export class AccountService extends Services {
  getAccountInfo = async (
    token: string | null
  ): Promise<getAccountInfoResponseType> => {
    this.abortController = new AbortController();
    try {
      if (token) {
        const response = await this.fetchApi<
          typeof getAccountInfoResponseSchema,
          getAccountInfoResponseType
        >({
          method: 'GET',
          url: getAccountInfoUrl,
          schema: getAccountInfoResponseSchema,
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
      console.log('ERROR: ', error);
      throw this.handleError(error);
    }
  };
}
