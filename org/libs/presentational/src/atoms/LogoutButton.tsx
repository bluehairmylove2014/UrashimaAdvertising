'use client';

import { useLogout } from '@business-layer/business-logic/lib/auth';
import CustomButton from './CustomButton';
import { useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';
import { useNavigateLoader } from './NavigateLoader';

function LogoutButton() {
  const router = useRouter();
  const { onLogout } = useLogout();
  const { showLoader } = useNavigateLoader();
  return (
    <CustomButton
      onClick={() => {
        onLogout();
        router.push(OFFICER_PAGES.AUTH);
        showLoader();
      }}
      style="fill-error"
      type="button"
    >
      Đăng xuất
    </CustomButton>
  );
}

export default LogoutButton;
