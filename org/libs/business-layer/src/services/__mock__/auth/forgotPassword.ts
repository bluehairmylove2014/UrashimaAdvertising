import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { officerForgotPasswordUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + officerForgotPasswordUrl)
  .reply((config: any) => {
    const data = JSON.parse(config.data);
    console.log(officerForgotPasswordUrl, ': ', data);
    return [
      200,
      {
        message: 'Thành công gửi mã OTP',
      },
    ];
  });
