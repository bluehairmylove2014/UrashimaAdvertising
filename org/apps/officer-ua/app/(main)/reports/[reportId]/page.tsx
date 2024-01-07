import { COOKIE_KEYS } from "@business-layer/business-logic/configs/constants";
import { ReportService } from "@business-layer/services";
import { IBreadcrumb } from "@business-layer/services/entities";
import { OFFICER_PAGES } from "@constants/officerPages";
import Breadcrumbs from "@presentational/molecules/Breadcrumbs";
import DisplayReportDetail from "@presentational/organisms/DisplayReportDetail";
import { cookies } from "next/headers";
import Link from "next/link";


const reportService = new ReportService();
async function getReportDetail(reportId: number) {
    try {
        const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
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
            href: OFFICER_PAGES.DASHBOARD,
            label: 'Trang chủ',
            isCurrent: false,
        },
        {
            href: OFFICER_PAGES.REPORT,
            label: 'Danh sách báo cáo',
            isCurrent: false,
        },
        {
            href: OFFICER_PAGES.REPORT + `/${params.reportId}`,
            label: 'Chi tiết báo cáo',
            isCurrent: true,
        },
    ];

    return (
        <main className="container mx-auto px-4 py-12">
            <>
                {reportDetail ?
                    <>
                        <div className="flex flex-row justify-between items-start mb-8">
                            <div>
                                <h1 className="font-bold !text-base">
                                    CHI TIẾT BÁO CÁO
                                </h1>
                                <Breadcrumbs bcList={breadcrumbsData} />
                            </div>
                        </div>
                        <DisplayReportDetail reportDetail={reportDetail} isHeadQuarter={false} />
                    </>
                    : <></>}

            </>
        </main>
    );
}
export default Reports;