import { axiosMockAdapterInstance } from '../../config/axios';
import adsRawData from '../data/ads.json';
import { getApiUrl } from '../../config/url';
import { getOfficerAdDetailAdsUrl } from '../../config/apis';
import { IAdsDetail } from '@business-layer/services/entities';

const adsDetailData: IAdsDetail[] = adsRawData;

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getOfficerAdDetailAdsUrl)
  .reply((config: any) => {
    return [200, adsDetailData.find((ad) => ad.id === config.params.id)];
  });
