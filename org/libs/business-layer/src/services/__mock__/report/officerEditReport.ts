import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { editReportUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPut(getApiUrl(false) + editReportUrl)
  .reply((config: any) => {
    return [200, { message: 'Chỉnh sửa thành công' }];
  });
