// PROXY_URL
const workerUrl = 'https://ura-ads.phucdat4102.workers.dev';
// const ipLocationProxyUrl = workerUrl + '/ip-location' + `?ipaddress=`;
const ipLocationProxyUrl = 'http://ip-api.com/json';
const corsProxyUrl = workerUrl + '/cors-proxy/';
// 'https://cors-anywhere.herokuapp.com/';

// AUTH
export const loginUrl = '/v1/auth/login';
export const refreshTokenUrl = '/v1/auth/refresh-token';
export const updateAccountUrl = '/v1/auth/login-social';

// ADS
export const getAllAdsUrl = '/api/ads-points';

// IP LOCATION
export const getCurrentLocationUrl = ipLocationProxyUrl;

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
