'use client';

import ButtonLoader from '@presentational/atoms/ButtonLoader';
import {
  useFacebookLogin,
  useGithubLogin,
  useGoogleLogin,
} from '@business-layer/business-logic/lib/auth';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';
import Image from 'next/image';
import { SOCIAL_LOGIN_METHODS } from '../../../../constants/social';

type authStateType = {
  order: number;
  name: string;
};
const authState: {
  [key: string]: authStateType;
} = {
  CHECK_LOGIN_STATE: {
    order: 1,
    name: 'Đang kiểm tra đăng nhập...',
  },
  REDIRECT_STATE: {
    order: 2,
    name: 'Đang chuyển hướng...',
  },
};

function SocialAuth() {
  const [curAuthState, setCurAuthState] = useState<authStateType>(
    authState.CHECK_LOGIN_STATE
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const socialLoginMethod = useParams().method;
  const { onCheckGoogleLogin } = useGoogleLogin();
  const { onCheckFacebookLogin } = useFacebookLogin();
  const { onCheckGithubLogin } = useGithubLogin();

  useEffect(() => {
    if (socialLoginMethod && SOCIAL_LOGIN_METHODS.includes(socialLoginMethod)) {
      let checkingMethod = null;
      switch (socialLoginMethod) {
        case 'gg':
          checkingMethod = onCheckGoogleLogin;
          break;
        case 'fb':
          checkingMethod = onCheckFacebookLogin;
          break;
        case 'git':
          checkingMethod = onCheckGithubLogin;
          break;
      }
      checkingMethod &&
        checkingMethod()
          .then((msg) => {
            setCurAuthState(authState.REDIRECT_STATE);
            // Handle get redirect url here
            setTimeout(() => {
              router.push(OFFICER_PAGES.DASHBOARD);
              router.refresh();
            }, 1000);
          })
          .catch((error) => {
            setErrorMsg(error.message);
            setTimeout(() => {
              router.push(OFFICER_PAGES.AUTH);
            }, 4000);
          });
    } else {
      setErrorMsg('Lỗi vớ vẩn! Đang chuyển hướng...');
      setTimeout(() => {
        router.push(OFFICER_PAGES.AUTH);
      }, 4000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto max-w-xs relative z-20">
      <div className="w-full h-fit bg-white overflow-hidden rounded px-4 py-10">
        {errorMsg ? (
          <div className="flex flex-row flex-nowrap justify-center items-center gap-3">
            <Image
              src="/assets/images/icons/error.png"
              alt="error"
              width={30}
              height={30}
            />
            <span className="flex shrink w-fit text-base">{errorMsg}</span>
          </div>
        ) : (
          <ButtonLoader label={curAuthState.name} loaderColor="BLUE" />
        )}
      </div>
    </div>
  );
}

export default SocialAuth;
