import { axiosMockAdapterInstance } from '../../config/axios';
import adsRawData from '../data/ads.json';
import { getApiUrl } from '../../config/url';
import { getAllAdsUrl } from '../../config/apis';
import { IAdLocation } from '@business-layer/services/entities';

const adsData: IAdLocation[] = adsRawData;

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAllAdsUrl)
  .reply((config: any) => {
    return [200, adsData];
  });
