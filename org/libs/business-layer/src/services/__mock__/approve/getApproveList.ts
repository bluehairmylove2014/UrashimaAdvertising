import { axiosMockAdapterInstance } from '../../config/axios';
import approveRawData from '../data/approve.json';
import { getApiUrl } from '../../config/url';
import { getApproveListUrl } from '../../config/apis';
import { IApprove } from '@business-layer/services/entities/approve';

const approveData: IApprove[] = approveRawData;

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getApproveListUrl)
  .reply((config: any) => {
    return [200, approveData];
  });
