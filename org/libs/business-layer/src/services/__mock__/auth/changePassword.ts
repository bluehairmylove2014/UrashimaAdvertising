import { axiosMockAdapterInstance } from '../../config/axios';
import accountsData from '../data/accounts.json';
import { getApiUrl } from '../../config/url';
import { officerChangePasswordUrl } from '../../config/apis';
import { IAccount } from '@business-layer/services/entities';

const accounts: IAccount[] = accountsData;

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + officerChangePasswordUrl)
  .reply((config: any) => {
    const data = JSON.parse(config.data);
    const isValidLogin = accounts.some(
      (account) => account.password === data.oldPassword
    );
    if (isValidLogin) {
      return [
        200,
        {
          message: 'Đổi mật khẩu thành công',
        },
      ];
    } else {
      return [
        403,
        {
          message: 'Mật khẩu không chính xác',
        },
      ];
    }
  });
