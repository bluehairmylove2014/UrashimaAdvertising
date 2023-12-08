import { AuthProvider } from '../lib/auth/process/provider';
import { AdsProvider } from '../lib/ads/process/provider';
import { ReportProvider } from '../lib/report/process/provider';
import { ReportFormProvider } from '../lib/reportForm/process/provider';

export const reactQueryDevtoolsConfig = {
  isActive: process.env.NODE_ENV === 'development',
};

export const authConfig = {
  isNeedRefreshToken: true,
  isNeedBroadcast: true,
};
export const mutationConfig = {
  MUTATION_RETRY: 0,
  USE_QUERY_RETRY: 1,
};

export const providerConfig = [
  {
    key: 'auth',
    provider: AuthProvider,
    isActive: true,
  },
  {
    key: 'ads',
    provider: AdsProvider,
    isActive: true,
  },
  {
    key: 'report',
    provider: ReportProvider,
    isActive: true,
  },
  {
    key: 'report-form',
    provider: ReportFormProvider,
    isActive: true,
  },
];

export const googleConfig = {
  REDIRECT_URI_PATH: '/social-auth/gg',
  AUTH_URI: 'https://accounts.google.com/o/oauth2/auth',
  TOKEN_URI: 'https://oauth2.googleapis.com/token',
  AUTH_PROVIDER_X509_CERT_URL: 'https://www.googleapis.com/oauth2/v1/certs',
  SCOPE:
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
};

export const facebookConfig = {
  REDIRECT_URI_PATH: '/social-auth/fb',
  AUTH_URI: 'https://www.facebook.com/v17.0/dialog/oauth',
  SCOPE: 'public_profile,email',
  STATE: '{st=datsuperman04102014helloanhLong,ds=2789562897562}',
};

export const githubConfig = {
  REDIRECT_URI_PATH: '/social-auth/git',
  AUTH_URI: 'https://github.com/login/oauth/authorize',
  SCOPE: 'user:email',
};
