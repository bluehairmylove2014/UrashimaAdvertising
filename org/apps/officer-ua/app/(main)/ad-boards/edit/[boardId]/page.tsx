import { AdsService } from '@business-layer/services';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import Link from 'next/link';
import { IBreadcrumb } from '@business-layer/services/entities';
import { OFFICER_PAGES } from '@constants/officerPages';

const officerService = new AdsService();

async function AdBoards({ params }: { params: { boardId: string } }) {
  const adData = await officerService.getOfficerLocationDetail(
    Number.parseInt(params.boardId)
  );
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
      isCurrent: false,
    },
    {
      href: OFFICER_PAGES.ADS_BOARD_EDIT + `/${params.boardId}`,
      label: 'Chỉnh sửa',
      isCurrent: true,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-col justify-start items-start mb-8 ">
        <h1 className="font-bold !text-base">CHỈNH SỬA ĐIỂM ĐẶT QUẢNG CÁO</h1>
        <Breadcrumbs bcList={breadcrumbsData} />
      </div>
      <DisplayAdDetail adData={adData} />
    </main>
  );
}

export default AdBoards;
