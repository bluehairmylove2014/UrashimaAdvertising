import { axiosMockAdapterInstance } from '../../config/axios';
import modificationRequestsRawData from '../data/modificationRequests.json';
import { getApiUrl } from '../../config/url';
import { getAllAdModificationRequestEndpoint } from '../../config/apis';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAllAdModificationRequestEndpoint)
  .reply((config: any) => {
    return [200, modificationRequestsRawData];
  });
