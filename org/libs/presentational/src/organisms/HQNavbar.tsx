'use client';

import { HQ_PAGES } from '@constants/hqPages';
import HQLogoutButton from '@presentational/atoms/HQLogoutButton';
import HQTabButton from '@presentational/atoms/HQTabButton';
import HQNavAvatar from '@presentational/atoms/HQNavAvatar';
import { useNavigateLoader } from '@presentational/atoms/NavigateLoader';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useViewLocationMap } from './ViewLocationMap';

function HQNavbar() {
  const { isActive, hideLoader } = useNavigateLoader();
  const { isActive: isMapOpening, closeMap } = useViewLocationMap();
  const pathName = usePathname();
  const [tabs, setTabs] = useState([
    {
      iconCls: 'fi fi-ss-chart-pie-alt',
      name: 'Tổng quan',
      href: HQ_PAGES.DASHBOARD,
      isNeedLoader: true,
    },
    {
      iconCls: 'fi fi-ss-house-building',
      name: 'Khu vực',
      href: HQ_PAGES.REGIONS,
      isNeedLoader: true,
    },
    {
      iconCls: 'fi fi-sr-it',
      name: 'Thiết lập chung',
      href: HQ_PAGES.AD_SETTING,
      isNeedLoader: true,
    },
    {
      iconCls: 'fi fi-sr-ad',
      name: 'Quảng cáo',
      href: HQ_PAGES.AD_LOCATIONS,
      isNeedLoader: true,
    },
    {
      iconCls: 'fi fi-sr-comment-alt',
      name: 'Các yêu cầu',
      href: HQ_PAGES.AD_REQUESTS,
      isNeedLoader: true,
    },
    {
      iconCls: 'fi fi-sr-sensor-alert',
      name: 'Các báo cáo',
      href: HQ_PAGES.REPORTS,
      isNeedLoader: true,
    },
    {
      iconCls: 'fi fi-sr-portrait',
      name: 'Tài khoản',
      href: HQ_PAGES.ACCOUNT_MANAGEMENT,
      isNeedLoader: true,
    },
  ]);

  useEffect(() => {
    if (isActive) {
      hideLoader();
    }
    if (isMapOpening) {
      closeMap();
    }
    setTabs(
      tabs.map((t) => {
        if (pathName.startsWith(t.href)) {
          return {
            ...t,
            isNeedLoader: false,
          };
        } else {
          return t;
        }
      })
    );
  }, [pathName]);

  return (
    <nav className="bg-rose-100 px-4 py-6 flex flex-col justify-between w-full h-full shadow-[10px_0px_25px_-15px_rgba(0,0,0,0.1)]">
      <ul className="w-full">
        <li>
          <HQNavAvatar />
        </li>
        {tabs.map((t, i) => (
          <HQTabButton key={`tabBtn@${i}`} {...t} />
        ))}
      </ul>
      <HQLogoutButton />
    </nav>
  );
}

export default HQNavbar;
