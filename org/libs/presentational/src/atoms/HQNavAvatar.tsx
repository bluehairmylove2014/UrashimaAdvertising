'use client';
import Image from 'next/image';
import HQIcon from '@assets/districtofficer.png';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  useFetchRegions,
  useSetRegions,
} from '@business-layer/business-logic/lib/regionManagement';
import { HQ_PAGES } from '@constants/hqPages';
import { useNavigateLoader } from './NavigateLoader';

function HQNavAvatar() {
  const { data: regionData } = useFetchRegions();
  const { setRegions } = useSetRegions();
  const { showLoader } = useNavigateLoader();

  useEffect(() => {
    if (regionData) {
      setRegions(regionData.map((r) => `${r.ward}, ${r.district}`));
    }
  }, [regionData]);
  return (
    <Link
      href={HQ_PAGES.ME}
      onClick={() => showLoader()}
      className="w-full h-fit rounded overflow-hidden flex flex-row items-center justify-start mb-6 gap-3 hover:text-orange-600 transition-colors"
    >
      <Image src={HQIcon} alt="" width={40} height={40} />
      <div className="h-fit">
        <small className="font-medium">Xin chào!</small>
        <p className="font-semibold">{'Phan Phúc Đạt'}</p>
      </div>
    </Link>
  );
}

export default HQNavAvatar;
