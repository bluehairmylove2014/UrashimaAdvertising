import { axiosMockAdapterInstance } from '../../config/axios';
import accountInfoData from '../data/accountInfo.json';
import { getApiUrl } from '../../config/url';
import { getAccountInfoUrl, modifyAccountInfoUrl } from '../../config/apis';
import { IAccountDetail } from '@business-layer/services/entities';

const accountDetailData: IAccountDetail[] = accountInfoData;

axiosMockAdapterInstance
  .onPut(getApiUrl(false) + modifyAccountInfoUrl)
  .reply((config: any) => {
    return [200, { message: 'Chỉnh sửa thành công' }];
  });
