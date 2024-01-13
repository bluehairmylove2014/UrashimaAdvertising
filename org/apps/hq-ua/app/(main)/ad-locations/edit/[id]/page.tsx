/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdsService } from '@business-layer/services';
import EditAdDetail from '@presentational/organisms/EditAdDetail';
import { IBreadcrumb } from '@business-layer/services/entities';
import { cookies } from 'next/headers';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import CommonLoader from '@presentational/atoms/CommonLoader';
import { HQ_PAGES } from '@constants/hqPages';
import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { getHostname } from '../../../../../helper/hostname';

const officerService = new AdsService();
async function getAdLocationDetail(id: number) {
  try {
    const token =
      cookies().get(getCustomAccessTokenKey(getHostname()))?.value ?? null;
    if (token) {
      return await officerService.getOfficerLocationDetail({
        adId: id,
        token: token,
      });
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
async function LocationEdit({ params }: { params: { id: string } }) {
  const adData = await getAdLocationDetail(Number.parseInt(params.id));
  const breadcrumbsData: IBreadcrumb[] = [
    {
      href: HQ_PAGES.AD_LOCATIONS,
      label: 'Danh sách điểm quảng cáo',
      isCurrent: false,
    },
    {
      href: HQ_PAGES.AD_LOCATIONS_DETAIL + `/${params.id}`,
      label: 'Chi tiết điểm quảng cáo',
      isCurrent: false,
    },
    {
      href: HQ_PAGES.AD_LOCATIONS_DETAIL + `/${params.id}`,
      label: 'Chỉnh sửa',
      isCurrent: true,
    },
  ];

  return (
    <main className="py-6 w-full h-screen flex flex-col">
      {adData ? (
        <>
          <div className="flex flex-row justify-start items-start mb-8 w-full flex-shrink">
            <HQPageTitle
              title="CHỈNH SỬA ĐIỂM ĐẶT QUẢNG CÁO"
              breadcrumbsData={breadcrumbsData}
            />
          </div>
          <div className="w-full flex-grow overflow-auto">
            <EditAdDetail
              customBackHref={HQ_PAGES.AD_LOCATIONS_DETAIL + `/${params.id}`}
              adData={adData}
            />
          </div>
        </>
      ) : (
        <CommonLoader />
      )}
    </main>
  );
}

export default LocationEdit;
