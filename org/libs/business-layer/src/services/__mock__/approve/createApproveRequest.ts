import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { createNewAdBoardApproveRequestUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + createNewAdBoardApproveRequestUrl)
  .reply((config: any) => {
    console.log(JSON.parse(config.data));
    return [200, { message: 'Tạo thành công' }];
  });
