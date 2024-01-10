import {
  ApproveProvider,
  approveProviderType,
} from '../lib/approve/process/provider/ApproveProvider';
import { AuthProvider, AuthProviderType } from '../lib/auth/process/provider';
import {
  OfficerAdProvider,
  officerAdProviderType,
} from '../lib/officerAds/process/provider/ReportProvider';
import { ReportProvider } from '../lib/report/process/provider';
import { reportProviderType } from '../lib/report/process/provider/ReportProvider';
import {
  PaginationProvider,
  paginationProviderType,
} from '../non-service-lib/pagination/process/provider/PaginationProvider';
import {
  RegionManagementProvider,
  regionManagementProviderType,
} from '../lib/regionManagement/process/provider/RegionManagementProvider';
import { ReportFormProvider } from '../non-service-lib/reportForm';
import { reportFormProviderType } from '../non-service-lib/reportForm/process/provider/ReportFormProvider';
import {
  SettingProvider,
  settingProviderType,
} from '../lib/setting/process/provider/SettingProvider';
import {
  ViewLocationMapProvider,
  viewLocationMapProviderType,
} from '../non-service-lib/viewLocationMap/process/provider/ViewLocationMapProvider';
import {
  NavigateLoaderProvider,
  navigateLoaderProviderType,
} from '../non-service-lib/navigateLoader/process/provider/ViewLocationMapProvider';

/**
 * REACT-QUERY-DEVTOOLS
 */
export const reactQueryDevtoolsConfig = {
  isActive: process.env.NODE_ENV === 'development',
};

/**
 * CONFIG FOR AUTH MODULES
 */
export const authConfig = {
  isNeedRefreshToken: true,
  isNeedBroadcast: false,
};

/**
 * MUTATION CONFIG FOR REACT-QUERY
 */
export const mutationConfig = {
  MUTATION_RETRY: 0,
  USE_QUERY_RETRY: 1,
};

/**
 * If you add 1 more module to providerConfig, you must
 * add to moduleKeyList and providerList as well
 */
export type moduleKeyList =
  | 'auth'
  | 'report'
  | 'report-form'
  | 'officer-ad'
  | 'pagination'
  | 'approve'
  | 'regions'
  | 'settings'
  | 'viewLocationMap'
  | 'navigateLoader';
export type providerList = React.FC<
  | AuthProviderType
  | reportProviderType
  | paginationProviderType
  | officerAdProviderType
  | reportFormProviderType
  | approveProviderType
  | regionManagementProviderType
  | settingProviderType
  | viewLocationMapProviderType
  | navigateLoaderProviderType
>;
export const providerConfig: {
  key: moduleKeyList;
  provider: providerList;
}[] = [
  {
    key: 'navigateLoader',
    provider: NavigateLoaderProvider,
  },
  {
    key: 'viewLocationMap',
    provider: ViewLocationMapProvider,
  },
  {
    key: 'settings',
    provider: SettingProvider,
  },
  {
    key: 'regions',
    provider: RegionManagementProvider,
  },
  {
    key: 'approve',
    provider: ApproveProvider,
  },
  {
    key: 'pagination',
    provider: PaginationProvider,
  },
  {
    key: 'officer-ad',
    provider: OfficerAdProvider,
  },
  {
    key: 'report',
    provider: ReportProvider,
  },
  {
    key: 'report-form',
    provider: ReportFormProvider,
  },
  {
    key: 'auth',
    provider: AuthProvider,
  },
];

/**
 * SOCIAL CONFIG
 * DO NOT put .env keys here (Id, Secret, ....)
 */
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
