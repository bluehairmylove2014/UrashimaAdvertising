import { axiosMockAdapterInstance } from '../../config/axios';
import locationRawData from '../data/location.json';
import { getApiUrl } from '../../config/url';
import { getLocationGeocoderUrl } from '../../config/apis';

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + getLocationGeocoderUrl)
  .reply((config: any) => {
    const { latitude, longitude } = config.params;
    return [
      200,
      {
        ...locationRawData[0],
        longt: longitude,
        latt: latitude,
      },
    ];
  });
