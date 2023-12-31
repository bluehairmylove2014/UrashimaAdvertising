import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';
import { AdsService } from '@business-layer/services';
import { IBreadcrumb } from '@business-layer/services/entities';
import { HQ_PAGES } from '@constants/hqPages';
import { cookies } from 'next/dist/client/components/headers';
import Link from 'next/link';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';
import HQPageTitle from '@presentational/molecules/HQPageTitle';

const officerService = new AdsService();
async function getAdLocationDetail(id: number) {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
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
            <Link
              href={HQ_PAGES.AD_LOCATIONS_MODIFICATION + `/${adData.id}`}
              className="px-4 py-2 rounded text-[0.65rem] font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
            >
              <i className="fi fi-ss-file-edit mr-2"></i>
              Chỉnh sửa
            </Link>
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
