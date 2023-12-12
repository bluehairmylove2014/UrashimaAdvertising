import { axiosMockAdapterInstance } from '../../config/axios';
import adsRawData from '../data/ads.json';
import { getApiUrl } from '../../config/url';
import { getAdDetailsUrl } from '../../config/apis';
import { IAdLocationDetail } from '@business-layer/services/entities';

const adsDetailData: IAdLocationDetail[] = adsRawData;

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAdDetailsUrl)
  .reply((config: any) => {
    return [200, adsDetailData.find((ad) => ad.id === config.params.id)];
  });
