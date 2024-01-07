import { COOKIE_KEYS } from "@business-layer/business-logic/configs/constants";
import { ReportService } from "@business-layer/services";
import { IBreadcrumb } from "@business-layer/services/entities";
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import { OFFICER_PAGES } from "@constants/officerPages";
import { cookies } from "next/headers";
import ReportTable from "@presentational/organisms/ReportTable"

const reportService = new ReportService();
async function getAllReportData() {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
    if (token) {
      return await reportService.getAllOfficerReport(token);
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
    href: OFFICER_PAGES.REPORT,
    label: 'Danh sách báo cáo',
    isCurrent: true,
  },
];


async function Reports() {
  const reportData = await getAllReportData();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-start justify-start mb-8">
        <h1 className="w-full font-bold !text-base">
          DANH SÁCH BÁO CÁO
        </h1>
        <Breadcrumbs bcList={breadcrumbsData} />
      </div>
      {reportData ?
        <ReportTable reportData={reportData} isHeadQuarter={false} regionsData={null} />
        : <></>}
    </div>
  );
}

export default Reports;
