import { COOKIE_KEYS } from "@business-layer/business-logic/configs/constants";
import { RegionService, ReportService } from "@business-layer/services";
import ReportTable from "@presentational/organisms/ReportTable"
import { cookies } from "next/headers";

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

const regionService = new RegionService();
async function getRegions() {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
    if (token) {
      return await regionService.getRegions(token);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function Reports() {
  const reportData = await getAllReportData();
  const regionsData = await getRegions() ?? [];

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col items-start justify-start mb-8">
        <h1 className="w-full font-bold !text-base">
          DANH SÁCH BÁO CÁO
        </h1>
      </div>
      {reportData ?
        <ReportTable reportData={reportData} isHeadQuarter={true} regionsData={regionsData} />
        : <></>}
    </main>
  )
}

export default Reports;
