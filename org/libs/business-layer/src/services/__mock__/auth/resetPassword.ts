import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { officerResetPasswordUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + officerResetPasswordUrl)
  .reply((config: any) => {
    const data = JSON.parse(config.data);
    console.log(officerResetPasswordUrl, ': ', data);
    return [
      200,
      {
        message: 'Đổi mật khẩu thành công',
      },
    ];
  });
