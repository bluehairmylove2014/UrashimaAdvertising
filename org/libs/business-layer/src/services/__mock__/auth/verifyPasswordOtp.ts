import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { officerVerifyPasswordOtpUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + officerVerifyPasswordOtpUrl)
  .reply((config: any) => {
    const data = JSON.parse(config.data);
    console.log(officerVerifyPasswordOtpUrl, ': ', data);
    return [
      200,
      {
        message: 'Xác nhận OTP thành công',
      },
    ];
  });
