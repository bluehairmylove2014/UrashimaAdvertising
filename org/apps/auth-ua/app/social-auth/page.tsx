'use client';

import ButtonLoader from '@presentational/atoms/ButtonLoader';
import { useGoogleLogin } from '@business-layer/business-logic/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PAGE_URLS } from '@constants/pages';
import Image from 'next/image';

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
    name: 'Đang điều hướng...',
  },
};

function SocialAuth() {
  const [curAuthState, setCurAuthState] = useState<authStateType>(
    authState.CHECK_LOGIN_STATE
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const { onCheckGoogleLogin } = useGoogleLogin();

  useEffect(() => {
    onCheckGoogleLogin()
      .then((msg) => {
        setCurAuthState(authState.REDIRECT_STATE);

        // Handle get redirect url here
        setTimeout(() => {
          router.push(PAGE_URLS.HOME);
        }, 4000);
      })
      .catch((error) => setErrorMsg(error.msg));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-screen h-screen bg-[url('/assets/images/bgs/dark-bg.png')] bg-cover bg-no-repeat grid place-items-center">
      <div className="container mx-auto max-w-xs">
        <div className="w-full h-fit bg-white overflow-hidden rounded px-4 py-10">
          {errorMsg ? (
            <div className="flex flex-row justify-center items-center gap-3">
              <Image
                src="/assets/images/icons/error.png"
                alt="error"
                width={30}
                height={30}
              />
              <span>{errorMsg}</span>
            </div>
          ) : (
            <ButtonLoader label={curAuthState.name} loaderColor="BLUE" />
          )}
        </div>
      </div>
    </main>
  );
}

export default SocialAuth;
