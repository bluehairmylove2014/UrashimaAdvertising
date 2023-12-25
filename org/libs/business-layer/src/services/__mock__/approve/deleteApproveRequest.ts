import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { deleteApproveUrl } from '../../config/apis';
import approveList from '../data/approve.json';

axiosMockAdapterInstance
  .onDelete(getApiUrl(false) + deleteApproveUrl)
  .reply((config: any) => {
    const targetId = config.params.id;
    const targetIndex = approveList.findIndex(
      (approve) => approve.id === targetId
    );

    if (targetIndex !== -1) {
      approveList.splice(targetIndex, 1);
    }
    return [200, { message: 'Xoá thành công request id ' + targetId }];
  });
