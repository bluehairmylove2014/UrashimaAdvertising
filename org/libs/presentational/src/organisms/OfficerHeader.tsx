'use client';
import { OFFICER_PAGES } from '@constants/officerPages';
import BellButton from '@presentational/atoms/BellButton';
import { useNavigateLoader } from '@presentational/atoms/NavigateLoader';
import OfficerNavLogoutBtn from '@presentational/atoms/OfficerNavLogoutBtn';
import OfficerNavAvatar from '@presentational/molecules/OfficerNavAvatar';
import OfficerNavDropdown from '@presentational/molecules/OfficerNavDropdown';
import RegionManagementDropdown from '@presentational/molecules/RegionManagementDropdown';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function OfficerHeader() {
  const { isActive, hideLoader, showLoader } = useNavigateLoader();
  const [isReportPageNeedLoader, setIsReportPageNeedLoader] =
    useState<boolean>(true);
  const [isHomePageNeedLoader, setIsHomePageNeedLoader] =
    useState<boolean>(true);

  const [approveOptions, setApproveOptions] = useState([
    {
      name: 'Danh sách cấp phép',
      href: OFFICER_PAGES.REQUEST_LIST,
      isNeedLoader: true,
    },
    {
      name: 'Tạo cấp phép mới',
      href: OFFICER_PAGES.NEW_APPROVE,
      isNeedLoader: true,
    },
  ]);
  const [adsOptions, setAdsOptions] = useState([
    {
      name: 'Các điểm quảng cáo',
      href: OFFICER_PAGES.ADS_LOCATION,
      isNeedLoader: true,
    },
    {
      name: 'Các bảng quảng cáo',
      href: OFFICER_PAGES.ADS_BOARD,
      isNeedLoader: true,
    },
  ]);
  const pathName = usePathname();
  useEffect(() => {
    if (isActive) {
      hideLoader();
    }
    if (pathName === OFFICER_PAGES.REPORT) {
      setIsReportPageNeedLoader(false);
    }
    if (pathName === OFFICER_PAGES.DASHBOARD) {
      setIsHomePageNeedLoader(false);
    }
    setApproveOptions(
      approveOptions.map((a) => {
        if (a.href === pathName) {
          return {
            ...a,
            isNeedLoader: false,
          };
        } else {
          return a;
        }
      })
    );
    setAdsOptions(
      adsOptions.map((a) => {
        if (a.href === pathName) {
          return {
            ...a,
            isNeedLoader: false,
          };
        } else {
          return a;
        }
      })
    );
  }, [pathName]);
  return (
    <header className="flex flex-row items-center justify-between bg-indigo-950 w-full h-12 px-4 sticky top-0 z-20">
      <nav>
        <ul className="flex flex-row items-center justify-start gap-5">
          <Link href={OFFICER_PAGES.DASHBOARD}>
            <Image
              src={'/assets/images/logo/white.png'}
              alt="Urashima Ads"
              width={70}
              height={35}
              priority={true}
            />
          </Link>
          <li>
            <Link
              href={OFFICER_PAGES.DASHBOARD}
              onClick={() => {
                isHomePageNeedLoader && showLoader();
              }}
              className="text-xs text-white font-semibold hover:text-orange-400"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              href={OFFICER_PAGES.REPORT}
              onClick={() => {
                isReportPageNeedLoader && showLoader();
              }}
              className="text-xs text-white font-semibold hover:text-orange-400"
            >
              Báo cáo
            </Link>
          </li>
          <li>
            {/* <Link
              href={OFFICER_PAGES.ADS_LOCATION}
              onClick={() => {
                showLoader();
              }}
              className="text-xs text-white font-semibold hover:text-orange-400"
            >
              Quảng cáo
            </Link> */}
            <OfficerNavDropdown options={adsOptions} position="center">
              <span>Quảng cáo</span>
            </OfficerNavDropdown>
          </li>
          <li>
            <OfficerNavDropdown options={approveOptions} position="center">
              <span>Cấp phép</span>
            </OfficerNavDropdown>
          </li>
          <li>
            <RegionManagementDropdown />
          </li>
        </ul>
      </nav>
      <div className="flex flex-row justify-end items-center gap-4 hover">
        <OfficerNavAvatar />
        <BellButton />
        <OfficerNavLogoutBtn />
      </div>
    </header>
  );
}

export default OfficerHeader;
