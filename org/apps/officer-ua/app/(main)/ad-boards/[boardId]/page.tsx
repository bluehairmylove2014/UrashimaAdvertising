import { AdsService } from '@business-layer/services';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import Link from 'next/link';
import { IBreadcrumb } from '@business-layer/services/entities';
import { OFFICER_PAGES } from '@constants/officerPages';
import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';
import { cookies } from 'next/headers';

const officerService = new AdsService();
async function getAdLocationDetail(boardId: number) {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
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
      href: OFFICER_PAGES.ADS_BOARD + `/${params.boardId}`,
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
            <Link
              href={OFFICER_PAGES.ADS_BOARD + `/edit/${adData.id}`}
              className="px-4 py-2 rounded text-[0.65rem] font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
            >
              <i className="fi fi-ss-file-edit mr-2"></i>
              Chỉnh sửa
            </Link>
          </div>
          <DisplayAdDetail adData={adData} />
        </>
      ) : (
        <></>
      )}
    </main>
  );
}

export default AdBoards;
