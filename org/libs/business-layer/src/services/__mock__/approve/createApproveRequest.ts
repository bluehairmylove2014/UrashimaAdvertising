import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { createNewAdBoardApproveRequestUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + createNewAdBoardApproveRequestUrl)
  .reply((config: any) => {
    return [200, { message: 'Tạo thành công' }];
  });
