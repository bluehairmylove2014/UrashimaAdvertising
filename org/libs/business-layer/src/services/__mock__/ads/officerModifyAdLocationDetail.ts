import { axiosMockAdapterInstance } from '../../config/axios';
import adsRawData from '../data/ads.json';
import { getApiUrl } from '../../config/url';
import { adsPointModificationUrl } from '../../config/apis';
import { IAdLocationDetail } from '@business-layer/services/entities';

const adsDetailData: IAdLocationDetail[] = adsRawData;

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + adsPointModificationUrl)
  .reply((config: any) => {
    console.log('RECEIVE MODIFICATION DATA: ', JSON.parse(config.data));
    return [200, { message: 'Điều chỉnh thông tin thành công' }];
  });
