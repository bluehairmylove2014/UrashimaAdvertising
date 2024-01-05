import { axiosMockAdapterInstance } from '../../config/axios';
import rawData from '../data/adBoardTypes.json';
import { getApiUrl } from '../../config/url';
import { getAdBoardTypesSettingsUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getAdBoardTypesSettingsUrl)
  .reply((config: any) => {
    return [200, rawData];
  });
