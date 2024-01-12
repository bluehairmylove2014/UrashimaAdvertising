import { AdsService } from '@business-layer/services';
import { IBreadcrumb } from '@business-layer/services/entities';
import { HQ_PAGES } from '@constants/hqPages';
import { cookies } from 'next/dist/client/components/headers';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { getHostname } from '../../../../../helper/hostname';
import EditBtn from './editBtn';

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

async function LocationDetail({ params }: { params: { id: string } }) {
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
      isCurrent: true,
    },
  ];
  return (
    <main className="py-6 w-full h-screen flex flex-col">
      {adData ? (
        <>
          <div className="flex flex-row justify-between items-start mb-8 w-full flex-shrink">
            <HQPageTitle
              title="Danh sách điểm quảng cáo"
              breadcrumbsData={breadcrumbsData}
            />
            <EditBtn id={adData.id} />
          </div>
          <div className="w-full flex-grow overflow-auto">
            <DisplayAdDetail adData={adData} />
          </div>
        </>
      ) : (
        <></>
      )}
    </main>
  );
}

export default LocationDetail;
