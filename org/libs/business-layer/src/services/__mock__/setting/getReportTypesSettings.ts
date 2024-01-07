import { axiosMockAdapterInstance } from '../../config/axios';
import rawData from '../data/reportTypes.json';
import { getApiUrl } from '../../config/url';
import { getReportTypesSettingsUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getReportTypesSettingsUrl)
  .reply((config: any) => {
    return [200, rawData];
  });
