import AdBoardsTable from '@presentational/organisms/AdBoardsTable';
import { IBreadcrumb } from '@business-layer/services/entities';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import { OFFICER_PAGES } from '@constants/officerPages';

const breadcrumbsData: IBreadcrumb[] = [
  {
    href: OFFICER_PAGES.DASHBOARD,
    label: 'Trang chủ',
    isCurrent: false,
  },
  {
    href: OFFICER_PAGES.ADS_LOCATION,
    label: 'Các bảng quảng cáo',
    isCurrent: true,
  },
];

function AdBoards() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-start justify-start mb-8">
        <h1 className="w-full font-bold !text-base">
          DANH SÁCH BẢNG QUẢNG CÁO
        </h1>
        <Breadcrumbs bcList={breadcrumbsData} />
      </div>
      <AdBoardsTable />
    </div>
  );
}

export default AdBoards;
