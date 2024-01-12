import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { RegionService } from '@business-layer/services';
import AdRequestTable from '@presentational/organisms/AdRequestTable';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import { getHostname } from '../../../helper/hostname';
import { cookies } from 'next/headers';
import { IBreadcrumb } from '@business-layer/services/entities';
import { OFFICER_PAGES } from '@constants/officerPages';

const regionService = new RegionService();
async function getRegions() {
  try {
    const token =
      cookies().get(getCustomAccessTokenKey(getHostname()))?.value ?? null;
    if (token) {
      return await regionService.getRegions(token);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
const breadcrumbsData: IBreadcrumb[] = [
  {
    href: OFFICER_PAGES.DASHBOARD,
    label: 'Trang chủ',
    isCurrent: false,
  },
  {
    href: OFFICER_PAGES.REQUEST_LIST,
    label: 'Danh sách các cấp phép',
    isCurrent: true,
  },
];
async function AdRequests() {
  const regionsData = await getRegions();
  return (
    <div className="container mx-auto px-4 py-12 w-full h-screen overflow-y-auto scrollbar-hide">
      <div className="flex flex-col items-start justify-start mb-8">
        <h1 className="w-full font-bold !text-base">DANH SÁCH CÁC CẤP PHÉP</h1>
        <Breadcrumbs bcList={breadcrumbsData} />
      </div>
      <AdRequestTable regionsData={regionsData} isOfficer={true} />
    </div>
  );
}

export default AdRequests;
