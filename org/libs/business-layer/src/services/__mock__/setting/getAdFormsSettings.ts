import { axiosMockAdapterInstance } from '../../config/axios';
import rawData from '../data/adForms.json';
import { getApiUrl } from '../../config/url';
import { getAdFormsSettingsUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAdFormsSettingsUrl)
  .reply((config: any) => {
    return [200, rawData];
  });
