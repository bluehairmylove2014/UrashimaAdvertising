// PROXY_URL
const proxyUrl = 'https://ura-ads.phucdat4102.workers.dev/cors-proxy/';
// 'https://cors-anywhere.herokuapp.com/';

// AUTH
export const loginUrl = '/v1/auth/login';
export const refreshTokenUrl = '/v1/auth/refresh-token';
export const updateAccountUrl = '/v1/auth/login-social';

// ADS
export const getAllAdsUrl = '/api/ads-points';

// GOOGLE
export const googleGetUserInfoUrl =
  proxyUrl +
  'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses';
export const googleValidateTokenUrl =
  proxyUrl + 'https://www.googleapis.com/oauth2/v3/tokeninfo';
// FACEBOOK
export const facebookGetFBAccessTokenUrl =
  proxyUrl + 'https://graph.facebook.com/v17.0/oauth/access_token';
export const facebookGetFBUserInfoUrl =
  proxyUrl + 'https://graph.facebook.com/me?fields=first_name,last_name,email';
// GITHUB
export const githubGetAccessTokenUrl =
  proxyUrl + 'https://github.com/login/oauth/access_token';
export const githubValidateTokenUrl =
  proxyUrl + 'https://api.github.com/authorizations/';
export const githubGetUserInfoUrl = proxyUrl + 'https://api.github.com/user';
