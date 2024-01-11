import { OFFICER_PAGES } from '@constants/officerPages';
import BellButton from '@presentational/atoms/BellButton';
import OfficerNavLogoutBtn from '@presentational/atoms/OfficerNavLogoutBtn';
import OfficerNavAvatar from '@presentational/molecules/OfficerNavAvatar';
import OfficerNavDropdown from '@presentational/molecules/OfficerNavDropdown';
import RegionManagementDropdown from '@presentational/molecules/RegionManagementDropdown';
import Image from 'next/image';
import Link from 'next/link';

const officerApproveNavDropdownOptions = [
  {
    name: 'Danh sách cấp phép',
    href: OFFICER_PAGES.APPROVE_LIST,
  },
  {
    name: 'Tạo cấp phép mới',
    href: OFFICER_PAGES.NEW_APPROVE,
  },
];
// const officerAdsNavDropdownOptions = [
//   {
//     name: 'Danh sách điểm quảng cáo',
//     href: OFFICER_PAGES.ADS_LOCATION,
//   },
//   {
//     name: 'Danh sách bảng quảng cáo',
//     href: OFFICER_PAGES.ADS_LOCATION,
//   },
// ];

async function OfficerHeader() {
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
              className="text-xs text-white font-semibold hover:text-orange-400"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              href={OFFICER_PAGES.REPORT}
              className="text-xs text-white font-semibold hover:text-orange-400"
            >
              Báo cáo
            </Link>
          </li>
          <li>
            <Link
              href={OFFICER_PAGES.ADS_LOCATION}
              className="text-xs text-white font-semibold hover:text-orange-400"
            >
              Quảng cáo
            </Link>
            {/* <OfficerNavDropdown
              options={officerAdsNavDropdownOptions}
              position="center"
            >
              <span>Quảng cáo</span>
            </OfficerNavDropdown> */}
          </li>
          <li>
            <OfficerNavDropdown
              options={officerApproveNavDropdownOptions}
              position="center"
            >
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
