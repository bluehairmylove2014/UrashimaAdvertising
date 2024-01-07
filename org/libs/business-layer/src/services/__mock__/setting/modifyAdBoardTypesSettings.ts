import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { modifyAdBoardTypesSettingsUrl } from '../../config/apis';
import rawData from '../data/adBoardTypes.json';

axiosMockAdapterInstance
  .onPut(getApiUrl(false) + modifyAdBoardTypesSettingsUrl)
  .reply((config: any) => {
    rawData.length = 0;
    const newData = JSON.parse(config.data);
    newData.forEach((d: any) => rawData.push(d));
    return [200, { message: 'success' }];
  });
