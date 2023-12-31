import { HQ_PAGES } from '@constants/hqPages';
import HQLogoutButton from '@presentational/atoms/HQLogoutButton';
import HQTabButton from '@presentational/atoms/HQTabButton';
import Image from 'next/image';
import HQIcon from '@assets/districtofficer.png';
import Link from 'next/link';

const tabs = [
  {
    iconCls: 'fi fi-ss-chart-pie-alt',
    name: 'Tổng quan',
    href: HQ_PAGES.DASHBOARD,
  },
  {
    iconCls: 'fi fi-ss-house-building',
    name: 'Khu vực',
    href: HQ_PAGES.REGIONS,
  },
  {
    iconCls: 'fi fi-sr-it',
    name: 'Thiết lập chung',
    href: HQ_PAGES.AD_SETTING,
  },
  {
    iconCls: 'fi fi-sr-ad',
    name: 'Quảng cáo',
    href: HQ_PAGES.AD_LOCATIONS,
  },
  {
    iconCls: 'fi fi-sr-comment-alt',
    name: 'Các yêu cầu',
    href: HQ_PAGES.AD_REQUESTS,
  },
  {
    iconCls: 'fi fi-sr-sensor-alert',
    name: 'Các báo cáo',
    href: HQ_PAGES.REPORTS,
  },
];

function HQNavbar() {
  return (
    <nav className="bg-rose-50 px-4 py-6 flex flex-col justify-between w-full h-full shadow-[10px_0px_25px_-15px_rgba(0,0,0,0.1)]">
      <ul className="w-full">
        <li>
          <Link
            href={HQ_PAGES.ME}
            className="w-full h-fit rounded overflow-hidden flex flex-row items-center justify-start mb-6 gap-3 hover:text-orange-600 transition-colors"
          >
            <Image src={HQIcon} alt="" width={40} height={40} />
            <div className="h-fit">
              <small className="font-medium">Xin chào!</small>
              <p className="font-semibold">{'Phan Phúc Đạt'}</p>
            </div>
          </Link>
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
