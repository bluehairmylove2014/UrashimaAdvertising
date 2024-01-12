'use client'

import { HQ_PAGES } from '@constants/hqPages';
import { useNavigateLoader } from '@presentational/atoms/NavigateLoader';
import Link from 'next/link';

function AddNewLocationBtn() {
  const { showLoader } = useNavigateLoader();
  return (
    <Link
      href={HQ_PAGES.AD_NEW_LOCATION}
      onClick={() => showLoader()}
      className="font-medium text-white grid place-items-center bg-green-600 rounded h-full w-fit px-4 text-xs hover:bg-green-400 transition-colors"
    >
      + Thêm điểm
    </Link>
  );
}

export default AddNewLocationBtn;
