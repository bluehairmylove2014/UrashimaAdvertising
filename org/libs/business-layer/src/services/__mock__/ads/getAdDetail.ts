import { axiosMockAdapterInstance } from '../../config/axios';
import adsRawData from '../data/ads.json';
import { getApiUrl } from '../../config/url';
import { getAdDetailsUrl } from '../../config/apis';
import { IAdsDetail } from '@business-layer/services/entities';

const adsDetailData: IAdsDetail[] = adsRawData;

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAdDetailsUrl)
  .reply((config: any) => {
    console.log('SEND AD DETAIL ID: ', config.params);
    return [200, adsDetailData.find((ad) => ad.id === config.params.id)];
  });
