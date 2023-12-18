import { axiosMockAdapterInstance } from '../../config/axios';
import accountInfoData from '../data/accountInfo.json';
import { getApiUrl } from '../../config/url';
import { getAccountInfoUrl } from '../../config/apis';
import { IAccountDetail } from '@business-layer/services/entities';

const accountDetailData: IAccountDetail[] = accountInfoData;

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAccountInfoUrl)
  .reply((config: any) => {
    return [200, accountDetailData[0]];
  });
