// PROXY_URL
const workerUrl = 'https://ura-ads.phucdat4102.workers.dev';
const corsProxyUrl = workerUrl + '/cors-proxy/';

// AUTH
export const loginUrl = '/api/auth/login';
export const registerUrl = '/api/auth/register';
export const refreshTokenUrl = '/api/auth/refresh-token';
export const updateAccountUrl = '/api/auth/login-social';

// ADS
export const getAllAdBoardsUrl = '/api/officer/ads-board';
export const getAllAdsUrl = '/api/ads-point';
export const getAdDetailsUrl = '/api/ads-point/detail';

export const getAllOfficerAdsUrl = '/api/officer/ads-point';
export const getOfficerLocationDetailAdsUrl = '/api/officer/ads-point';
export const getOfficerAdDetailAdsUrl = '/api/officer/ads-point/detail';
export const adsPointModificationUrl = '/api/officer/ads-modification/point';

export const getAllHQAdsForm = '/api/ads-type/all';

// REPORT
export const reportAdUrl = '/api/reports/ads-board';
export const reportLocationUrl = '/api/reports/location';

// OFFICER REPORT
export const getAllOfficerReportsUrl = '/api/officer/reports';
export const getOfficerReportDetailUrl = '/api/officer/reports/detail';
export const editReportUrl = '/api/officer/reports';

// ACCOUNT
export const hqGetAllAccountEndpoint = '/api/account/all';
export const hqUnitModifyAccountEndpoint = '/api/account/unit-modify';

// USER
export const getAccountInfoUrl = '/api/account/info';
export const modifyAccountInfoUrl = '/api/account/info';

// LOCATION
export const getLocationGeocoderUrl = '/api/location/geo-code';

// APPROVE
export const getApproveListUrl = '/api/officer/ads-request';
export const createNewAdBoardApproveRequestUrl =
  '/api/officer/ads-request/board';
export const deleteApproveUrl = '/api/officer/ads-request';
export const deleteModificationRequestUrl = '/api/officer/ads-modification';

// SIRV
export const sirvBaseUrlTemplate = 'https://api.sirv.com/v2';
export const connectSirvUrl = sirvBaseUrlTemplate + '/token';
export const uploadImageUrl = sirvBaseUrlTemplate + '/files/upload';
export const deleteImageUrl = sirvBaseUrlTemplate + '/files/delete';

// APPROVE OFFICER
export const approveNewAdLocationRequest = '/api/officer/ads-request';
export const getOfficerApproveListRequest = '/api/officer/ads-request';

// PASSWORD
export const officerChangePasswordUrl = '/api/auth/change-password';
export const officerForgotPasswordUrl = '/api/auth/forgot-password';
export const officerVerifyPasswordOtpUrl = '/api/auth/verify-otp';
export const officerResetPasswordUrl = '/api/auth/reset-password';

// FCAPTCHA
export const fCaptchaSiteverifyUrl =
  corsProxyUrl + 'https://api.friendlycaptcha.com/api/v1/siteverify';

// REGION
export const getRegionsUrl = '/api/headquater/ward-district';

// SETTING
export const getLocationSettingsUrl = '/api/location-type';
export const getAdFormsSettingsUrl = '/api/ads-form-type';
export const getAdBoardTypesSettingsUrl = '/api/ads-type';
export const getReportTypesSettingsUrl = '/api/report-type';
export const modifyLocationSettingsUrl = '/api/location-type';
export const modifyAdFormsSettingsUrl = '/api/ads-form-type';
export const modifyAdBoardTypesSettingsUrl = '/api/ads-type';
export const modifyReportTypesSettingsUrl = '/api/report-type';

// REQUEST
export const getAllAdModificationRequestEndpoint =
  '/api/headquater/ads-modification';
export const approveAdModificationRequestEndpoint =
  '/api/headquater/ads-modification/approve';
export const approveAdCreationRequestEndpoint =
  '/api/headquater/ads-request/status';

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
