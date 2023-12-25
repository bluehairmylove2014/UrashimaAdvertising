import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';
import { ReportService } from '@business-layer/services';
import { cookies } from 'next/headers';

const officerService = new ReportService();
async function getAdLocationDetail() {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
    if (token) {
      return await officerService.getAllOfficerReport(token);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function Report() {
  const adData = await getAdLocationDetail();
  console.log(adData);
  return <div>Report Page</div>;
}

export default Report;
