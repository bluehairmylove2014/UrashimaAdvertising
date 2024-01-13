import { AdsService } from '@business-layer/services';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import { IBreadcrumb } from '@business-layer/services/entities';
import { OFFICER_PAGES } from '@constants/officerPages';
import { cookies } from 'next/headers';
import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { getHostname } from '../../../../../helper/hostname';
import EmptyIcon from '@presentational/atoms/EmptyIcon';
import EditBtn from './editBtn';

const officerService = new AdsService();
async function getAdLocationDetail(boardId: number) {
  try {
    const token =
      cookies().get(getCustomAccessTokenKey(getHostname()))?.value ?? null;
    if (token) {
      return await officerService.getOfficerLocationDetail({
        adId: boardId,
        token: token,
      });
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
async function AdBoards({ params }: { params: { boardId: string } }) {
  const adData = await getAdLocationDetail(Number.parseInt(params.boardId));
  const breadcrumbsData: IBreadcrumb[] = [
    {
      href: OFFICER_PAGES.DASHBOARD,
      label: 'Trang chủ',
      isCurrent: false,
    },
    {
      href: OFFICER_PAGES.ADS_LOCATION,
      label: 'Danh sách điểm quảng cáo',
      isCurrent: false,
    },
    {
      href: OFFICER_PAGES.AD_LOCATION_DETAIL + `/${params.boardId}`,
      label: 'Chi tiết điểm quảng cáo',
      isCurrent: true,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      {adData ? (
        <>
          <div className="flex flex-row justify-between items-start mb-8 ">
            <div>
              <h1 className="font-bold !text-base">
                THÔNG TIN ĐIỂM ĐẶT QUẢNG CÁO
              </h1>
              <Breadcrumbs bcList={breadcrumbsData} />
            </div>
            <EditBtn id={adData.id} />
          </div>
          <DisplayAdDetail adData={adData} />
        </>
      ) : (
        <div className="grid place-items-center w-full h-[calc(100vh-120px)]">
          <div className="w-fit h-fit">
            <EmptyIcon
              customSize={100}
              label="Không tìm thấy thông tin cho điểm quảng cáo này"
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default AdBoards;
