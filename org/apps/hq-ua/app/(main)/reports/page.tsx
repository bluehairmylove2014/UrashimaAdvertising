import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { RegionService, ReportService } from '@business-layer/services';
import ReportTable from '@presentational/organisms/ReportTable';
import { getHostname } from '../../../helper/hostname';
import { cookies } from 'next/headers';
import HQPageTitle from '@presentational/molecules/HQPageTitle';

const reportService = new ReportService();
async function getAllReportData() {
  try {
    const token =
      cookies().get(getCustomAccessTokenKey(getHostname()))?.value ?? null;
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
    const token =
      cookies().get(getCustomAccessTokenKey(getHostname()))?.value ?? null;
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
  const regionsData = (await getRegions()) ?? [];

  return (
    <main className="py-6 w-full h-screen overflow-y-auto scrollbar-hide">
      <HQPageTitle title="DANH SÁCH BÁO CÁO" />

      <>
        {reportData ? (
          <ReportTable
            reportData={reportData}
            isHeadQuarter={true}
            regionsData={regionsData}
          />
        ) : (
          <></>
        )}
      </>
    </main>
  );
}

export default Reports;
