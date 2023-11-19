import { useEffect, useState } from "react";
import { Loader, authUrls } from "../../config";
import { useAuthContext } from "../context";
import { getWindowInstance } from "../helper/windowHelper";
import { useAccessToken } from "../hooks/useAccessToken";

type WrappedComponentProps = {
  children: React.ReactNode;
};
export const withAuthenticateUrl = (
  WrappedComponent: React.FC<WrappedComponentProps>
) => {
  const EnhancedComponent: React.FC<WrappedComponentProps> = (props) => {
    const windowInstance = getWindowInstance();
    const [isLoaderActive, setIsLoaderActive] = useState(true);
    const { getToken } = useAccessToken();
    const { state } = useAuthContext();
    const isLoggedIn = Boolean(state.token || getToken());

    /**
     * UPDATE METHODS TO GET PATHNAME RIGHT HERE
     * RECOMMEND:
     * + React: useLocation
     * + Next: useRouter
     */
    const currentPathname = windowInstance
      ? windowInstance.location.pathname
      : null;
    /**
     * DEFINE REDIRECT METHODS RIGHT HERE
     * @param {string} redirectUrl
     */
    const redirectMethods = (redirectUrl: string) => {
      windowInstance && (windowInstance.location.href = redirectUrl);
    };

    useEffect(() => {
      !currentPathname && setIsLoaderActive(false);
      // Check Auth url
      if (isLoggedIn) {
        // Already logged in
        setIsLoaderActive(false);
      } else {
        // Not logged in
        const target = authUrls.find((u) => currentPathname === u.authUrl);
        if (target && windowInstance) {
          // Autl url => redirect
          redirectMethods(target.redirectUrl);
        } else {
          // None autl url
          setIsLoaderActive(false);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPathname, isLoggedIn, state.token]);

    return isLoaderActive ? <Loader /> : <WrappedComponent {...props} />;
  };

  return EnhancedComponent;
};
