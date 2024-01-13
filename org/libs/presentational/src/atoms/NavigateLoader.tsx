'use client';

import {
  useGetIsActive,
  useSetIsActive,
} from '@business-layer/business-logic/non-service-lib/navigateLoader';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useNavigateLoader = () => {
  const isActive = useGetIsActive();
  const { setIsActive } = useSetIsActive();
  const showLoader = () => {
    setIsActive(true);
  };
  const hideLoader = () => {
    setIsActive(false);
  };
  return {
    isActive,
    showLoader,
    hideLoader,
  };
};
function NavigateLoader() {
  const circle = 'w-3 h-3 rounded-full bg-blue-700 animate-bounce';
  const { isActive, hideLoader } = useNavigateLoader();
  const pathName = usePathname()

  useEffect(() => {
    isActive && hideLoader()
  }, [pathName])

  return (
    <div
      style={{ display: isActive ? 'block' : 'none' }}
      className="w-screen h-screen fixed top-0 left-0 bg-white/60 z-50 cursor-wait"
    >
      <div className="flex flex-row gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`${circle}`}></div>
        <div className={`${circle} [animation-delay:-.3s]`}></div>
        <div className={`${circle} [animation-delay:-.5s]`}></div>
      </div>
    </div>
  );
}

export default NavigateLoader;
