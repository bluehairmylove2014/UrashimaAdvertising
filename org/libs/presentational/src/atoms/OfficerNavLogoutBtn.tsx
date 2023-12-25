'use client';

import { useLogout } from '@business-layer/business-logic/lib/auth';
import { OFFICER_PAGES } from '@constants/officerPages';
import { useRouter } from 'next/navigation';

function OfficerNavLogoutBtn() {
  const { onLogout } = useLogout();
  const router = useRouter();
  return (
    <button
      className="text-white hover:text-orange-400 transition-colors"
      onClick={() => {
        onLogout();
        router.push(OFFICER_PAGES.AUTH);
      }}
    >
      <i className="fi fi-bs-sign-out-alt"></i>
    </button>
  );
}

export default OfficerNavLogoutBtn;
