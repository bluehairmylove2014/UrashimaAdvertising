import { IBreadcrumb } from '@business-layer/services/entities';
import { OFFICER_PAGES } from '@constants/officerPages';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import CreateNewApproveForm from '@presentational/organisms/CreateNewApproveForm';

const breadcrumbsData: IBreadcrumb[] = [
  {
    href: OFFICER_PAGES.DASHBOARD,
    label: 'Trang chủ',
    isCurrent: false,
  },
  {
    href: OFFICER_PAGES.APPROVE_LIST,
    label: 'Danh sách cấp phép',
    isCurrent: false,
  },
  {
    href: OFFICER_PAGES.NEW_APPROVE,
    label: 'Tạo cấp phép',
    isCurrent: true,
  },
];

function NewApprove() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-start justify-start mb-8">
        <h1 className="w-full font-bold !text-base">CẤP PHÉP QUẢNG CÁO</h1>
        <Breadcrumbs bcList={breadcrumbsData} />
      </div>
      <CreateNewApproveForm />
    </div>
  );
}

export default NewApprove;
