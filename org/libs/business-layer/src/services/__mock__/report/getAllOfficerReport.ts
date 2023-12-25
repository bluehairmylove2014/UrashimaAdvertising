import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { getAllOfficerReportsUrl } from '../../config/apis';
import reportsData from '../data/reports.json';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAllOfficerReportsUrl)
  .reply((config: any) => {
    return [200, reportsData];
  });
