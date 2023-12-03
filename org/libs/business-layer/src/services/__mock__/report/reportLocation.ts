import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { reportLocationUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + reportLocationUrl)
  .reply((config: any) => {
    console.log('REPORT: ', JSON.parse(config.data));
    return [200, { messge: 'Báo cáo địa điểm thành công' }];
  });
