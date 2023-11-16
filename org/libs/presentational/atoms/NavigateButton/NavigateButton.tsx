'use client';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { commonButtonStyle } from '../CommonButton/type';

const NavigateButton = ({
  href,
  style,
  children,
  prefetching,
}: {
  href: string;
  style: commonButtonStyle;
  children: React.ReactNode;
  prefetching?: boolean;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (prefetching) {
      router.prefetch(href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommonButton
      style={style}
      onClick={() => {
        router.push(href);
      }}
    >
      {children}
    </CommonButton>
  );
};

export default NavigateButton;
