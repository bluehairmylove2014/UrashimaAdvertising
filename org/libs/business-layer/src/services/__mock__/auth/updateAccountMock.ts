import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { updateAccountUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + updateAccountUrl)
  .reply((config: any) => {
    console.log('UPDATE ACCOUNT: ', JSON.parse(config.data));
    return [
      200,
      {
        message: 'Login success',
        token: 'This is new login access token :>',
        refreshToken: 'This is refresh token',
      },
    ];
  });
