import { axiosMockAdapterInstance } from '../../config/axios';
import adsData from '../data/ads.json';
import { getApiUrl } from '../../config/url';
import { getAllAdsUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAllAdsUrl)
  .reply((config: any) => {
    return [200, adsData];
  });
