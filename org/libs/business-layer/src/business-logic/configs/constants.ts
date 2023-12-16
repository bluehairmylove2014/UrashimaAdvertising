import { generateSecureHash } from '../helper';

export const LOCAL_STORAGE_KEYS = {
  AD_REPORT: generateSecureHash('AD_REPORT_LOCAL'),
  LOCATION_REPORT: generateSecureHash('LOCATION_REPORT_LOCAL'),
};
export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'token',
  REFRESH_TOKEN: 'refresh_token',
};
export enum QUERY_N_MUTATION_KEYS {
  GET_ALL_PRODUCTS,
  GET_ALL_ADS,
  GET_IP_LOCATION,
  GET_ALL_OFFICER_ADS,
  GET_OFFICER_AD_DETAIL
}
