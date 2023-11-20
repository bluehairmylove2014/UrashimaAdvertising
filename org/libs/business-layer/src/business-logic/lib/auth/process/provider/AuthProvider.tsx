import { axios } from '../../../../../services';
import { authConfig } from '../../../../configs';
import { useRefreshToken } from '../hooks/useRefreshToken';
import { BroadcastProvider } from './BroadcastProvider';
import { AuthContextProvider } from './ContextProvider';
import { useLogout } from '../hooks';
import { withAuthenticateUrl } from './withAuthenticateUrl';
import { useHandleRefreshToken } from '../hooks/useHandleRefreshToken';

export type AuthProviderType = {
  children: React.ReactNode;
};
const EnhancedContextProvider = withAuthenticateUrl(AuthContextProvider);
// This is the AuthProvider for the entire app
export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  // Get the resetToken and getToken functions from useAccessToken
  const { getRefreshToken } = useHandleRefreshToken();
  const { onRefreshToken } = useRefreshToken();
  const { onLogout } = useLogout();

  // Use axios interceptor to handle response
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (
        error.response?.status === 401 &&
        error.response.data?.message === 'Invalid credential' &&
        authConfig.isNeedRefreshToken
      ) {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            const res = await onRefreshToken(refreshToken);
            if (!res.token) {
              return Promise.reject(error);
            }
            error.config.headers['Authorization'] = 'Bearer ' + res.token;
            return axios(error.config);
          } catch (err) {
            onLogout();
          }
        } else {
          onLogout();
        }
      }
      return Promise.reject(error);
    }
  );

  // Return the AuthContextProvider and BroadcastProvider with children
  return (
    <EnhancedContextProvider>
      <BroadcastProvider>{children}</BroadcastProvider>
    </EnhancedContextProvider>
  );
};
