import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { ReportService } from '@business-layer/services';
import DisplayReportDetail from '@presentational/organisms/DisplayReportDetail';
import { getHostname } from '../../../../helper/hostname';
import { cookies } from 'next/headers';
import { HQ_PAGES } from '@constants/hqPages';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import { IBreadcrumb } from '@business-layer/services/entities';

const reportService = new ReportService();
async function getReportDetail(reportId: number) {
  try {
    const token =
      cookies().get(getCustomAccessTokenKey(getHostname()))?.value ?? null;
    if (token) {
      return await reportService.getOfficerReportDetail(reportId, token);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function Reports({ params }: { params: { reportId: string } }) {
  const reportDetail = await getReportDetail(Number.parseInt(params.reportId));
  const breadcrumbsData: IBreadcrumb[] = [
    {
      href: HQ_PAGES.REPORTS,
      label: 'Danh sách báo cáo',
      isCurrent: false,
    },
    {
      href: HQ_PAGES.REPORTS + `/${params.reportId}`,
      label: 'Chi tiết báo cáo',
      isCurrent: true,
    },
  ];
  return (
    <main className="py-6 w-full h-screen overflow-y-auto scrollbar-hide">
      <>
        {reportDetail ? (
          <>
            <div className="flex flex-col items-start justify-start mb-8">
              <HQPageTitle
                title="CHI TIẾT BÁO CÁO"
                breadcrumbsData={breadcrumbsData}
              />
            </div>
            <DisplayReportDetail
              reportDetail={reportDetail}
              isHeadQuarter={true}
            />
          </>
        ) : (
          <></>
        )}
      </>
    </main>
  );
}
export default Reports;
