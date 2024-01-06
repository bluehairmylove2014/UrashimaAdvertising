import { axiosMockAdapterInstance } from '../../config/axios';
import { getApiUrl } from '../../config/url';
import { modifyLocationSettingsUrl } from '../../config/apis';
import rawData from '../data/locationTypes.json';

axiosMockAdapterInstance
  .onPut(getApiUrl(false) + modifyLocationSettingsUrl)
  .reply((config: any) => {
    rawData.length = 0;
    const newData = JSON.parse(config.data);
    newData.forEach((d: any) => rawData.push(d));
    return [200, { message: 'success' }];
  });
