import { generateSecureHash } from '../helper';

export const LOCAL_STORAGE_KEYS = {
  AD_REPORT: generateSecureHash('AD_REPORT_LOCAL'),
  LOCATION_REPORT: generateSecureHash('LOCATION_REPORT_LOCAL'),
};
export const COOKIE_KEYS = {
  ACCESS_TOKEN: generateSecureHash('COOKIE_ACCESS_TOKEN'),
  REFRESH_TOKEN: generateSecureHash('COOKIE_REFRESH_TOKEN'),
};
export enum QUERY_N_MUTATION_KEYS {
  GET_ALL_PRODUCTS,
  GET_ALL_ADS,
  GET_IP_LOCATION,
}
