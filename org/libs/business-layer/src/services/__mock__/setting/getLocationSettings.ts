import { axiosMockAdapterInstance } from '../../config/axios';
import rawData from '../data/locationTypes.json';
import { getApiUrl } from '../../config/url';
import { getLocationSettingsUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getLocationSettingsUrl)
  .reply((config: any) => {
    return [200, rawData];
  });
