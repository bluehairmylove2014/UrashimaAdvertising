// PROXY_URL
const workerUrl = 'https://ura-ads.phucdat4102.workers.dev';
const corsProxyUrl = workerUrl + '/cors-proxy/';

// AUTH
export const loginUrl = '/v1/auth/login';
export const refreshTokenUrl = '/v1/auth/refresh-token';
export const updateAccountUrl = '/v1/auth/login-social';

// ADS
export const getAllAdsUrl = '/api/ads-point';
export const getAdDetailsUrl = '/api/ads-point/detail';
export const getAllOfficerAdsUrl = '/api/officer/ads-point';
export const getOfficerLocationDetailAdsUrl = '/api/officer/ads-point';
export const getOfficerAdDetailAdsUrl = '/api/officer/ads-board/detail';
export const adsPointModificationUrl = '/api/officer/point-modification';

// REPORT
export const reportAdUrl = '/api/reports/ads-board';
export const reportLocationUrl = '/api/reports/location';

// USER
export const getAccountInfoUrl = '/api/account/info';
export const modifyAccountInfoUrl = '/api/account/info';

// LOCATION
export const getLocationGeocoderUrl = '/api/location/geo-code';

// APPROVE
export const getApproveListUrl = '/api/officer/ads-request';

// SIRV
export const sirvBaseUrlTemplate = 'https://api.sirv.com/v2';
export const connectSirvUrl = sirvBaseUrlTemplate + '/token';
export const uploadImageUrl = sirvBaseUrlTemplate + '/files/upload';
export const deleteImageUrl = sirvBaseUrlTemplate + '/files/delete';

// APPROVE OFFICER
export const approveNewAdLocationRequest = '/api/officer/ads-request';
export const getOfficerApproveListRequest = '/api/officer/ads-request';

// GOOGLE
export const googleGetUserInfoUrl =
  corsProxyUrl +
  'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses';
export const googleValidateTokenUrl =
  corsProxyUrl + 'https://www.googleapis.com/oauth2/v3/tokeninfo';
// FACEBOOK
export const facebookGetFBAccessTokenUrl =
  corsProxyUrl + 'https://graph.facebook.com/v17.0/oauth/access_token';
export const facebookGetFBUserInfoUrl =
  corsProxyUrl +
  'https://graph.facebook.com/me?fields=first_name,last_name,email';
// GITHUB
export const githubGetAccessTokenUrl =
  corsProxyUrl + 'https://github.com/login/oauth/access_token';
export const githubValidateTokenUrl =
  corsProxyUrl + 'https://api.github.com/authorizations/';
export const githubGetUserInfoUrl =
  corsProxyUrl + 'https://api.github.com/user';
