import 'tailwindcss/tailwind.css';
import ApprovesList from '@presentational/organisms/ApprovesList';
import { IBreadcrumb } from '@business-layer/services/entities';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import { OFFICER_PAGES } from '@constants/officerPages';
import { ApproveService } from '@business-layer/services';
import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';
import { cookies } from 'next/headers';
import {
  APPROVE_STATUS_FILTER_OPTIONS,
  APPROVE_TIME_FILTER_OPTIONS,
} from '../../../constants/approve';

const breadcrumbsData: IBreadcrumb[] = [
  {
    href: OFFICER_PAGES.DASHBOARD,
    label: 'Trang chủ',
    isCurrent: false,
  },
  {
    href: OFFICER_PAGES.APPROVE_LIST,
    label: 'Danh sách cấp phép',
    isCurrent: true,
  },
];

const approveService = new ApproveService();
async function getApprovesList() {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
    if (token) {
      return await approveService.getApproveList(token);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
async function Approves() {
  const approvesList = await getApprovesList();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-start justify-start mb-8">
        <h1 className="w-full font-bold !text-base">DANH SÁCH CẤP PHÉP</h1>
        <Breadcrumbs bcList={breadcrumbsData} />
      </div>
      <ApprovesList
        inputApproveData={approvesList}
        timeFilterOptions={APPROVE_TIME_FILTER_OPTIONS}
        requestStatusFilterOptions={APPROVE_STATUS_FILTER_OPTIONS}
      />
    </div>
  );
}

export default Approves;
