import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { getOfficerReportDetailUrl } from '../../config/apis';
import reportsData from '../data/reportDetail.json';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getOfficerReportDetailUrl)
  .reply((config: any) => {
    const id = config.params.id;
    return [200, reportsData.find((r) => r.id === id)];
  });
