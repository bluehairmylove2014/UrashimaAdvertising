import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { reportLocationUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + reportLocationUrl)
  .reply((config: any) => {
    return [200, { message: 'Báo cáo địa điểm thành công' }];
  });
