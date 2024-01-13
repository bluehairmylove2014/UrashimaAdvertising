'use client';

import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';
import { useLogout } from '@business-layer/business-logic/lib/auth';
import { HQ_PAGES } from '@constants/hqPages';
import { useNavigateLoader } from './NavigateLoader';

function HQLogoutButton() {
  const router = useRouter();
  const { onLogout } = useLogout();
  const { showLoader } = useNavigateLoader();
  return (
    <CustomButton
      style="fill-error"
      type="button"
      onClick={() => {
        onLogout();
        router.push(HQ_PAGES.AUTH);
        showLoader();
      }}
    >
      <i className="fi fi-bs-sign-out-alt mr-2"></i>Đăng xuất
    </CustomButton>
  );
}

export default HQLogoutButton;
