import { axiosMockAdapterInstance } from '../../config/axios';
import adsRawData from '../data/ads.json';
import { getApiUrl } from '../../config/url';
import { getAllOfficerAdsUrl } from '../../config/apis';
import { IAds } from '@business-layer/services/entities';

const adsData: IAds[] = adsRawData;

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAllOfficerAdsUrl)
  .reply((config: any) => {
    return [200, adsData];
  });
