import { COOKIE_KEYS } from "@business-layer/business-logic/configs/constants";
import { ReportService } from "@business-layer/services";
import DisplayReportDetail from "@presentational/organisms/DisplayReportDetail";
import { cookies } from "next/headers";

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

    return (
        <main className="container mx-auto px-4 py-6">
            <>
                {reportDetail ?
                    <>
                        <div className="flex flex-col items-start justify-start mb-8">
                            <div>
                                <h1 className="font-bold !text-base">
                                    CHI TIẾT BÁO CÁO
                                </h1>
                            </div>
                        </div>
                        <DisplayReportDetail reportDetail={reportDetail} isHeadQuarter={true} />
                    </>
                    : <></>}

            </>
        </main>
    );
}
export default Reports;