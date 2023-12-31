import { axiosMockAdapterInstance } from '../../config/axios';
import regionsRawData from '../data/regions.json';
import { getApiUrl } from '../../config/url';
import { getRegionsUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getRegionsUrl)
  .reply((config: any) => {
    return [200, regionsRawData];
  });
