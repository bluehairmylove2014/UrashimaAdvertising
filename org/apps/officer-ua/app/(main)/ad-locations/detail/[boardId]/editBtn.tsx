'use client';

import { OFFICER_PAGES } from '@constants/officerPages';
import { useNavigateLoader } from '@presentational/atoms/NavigateLoader';
import Link from 'next/link';

function EditBtn({ id }: { id: number }) {
  const { showLoader } = useNavigateLoader();
  return (
    <Link
      href={OFFICER_PAGES.AD_LOCATION_EDIT + `/${id}`}
      onClick={() => showLoader()}
      className="px-4 py-2 rounded text-[0.65rem] font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
    >
      <i className="fi fi-ss-file-edit mr-2"></i>
      Chỉnh sửa
    </Link>
  );
}

export default EditBtn;
