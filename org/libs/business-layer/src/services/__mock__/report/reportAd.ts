import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { reportAdUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + reportAdUrl)
  .reply((config: any) => {
    console.log('REPORT: ', JSON.parse(config.data));
    return [200, { message: 'Báo cáo thành công' }];
  });
