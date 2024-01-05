import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';
import { RegionService } from '@business-layer/services';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import AdRequestTable from '@presentational/organisms/AdRequestTable';
import { cookies } from 'next/headers';

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

async function AdRequests() {
  const regionsData = await getRegions();
  return (
    <div className="py-6 w-full h-screen">
      <HQPageTitle title="Các yêu cầu từ Phường, Quận" />
      <AdRequestTable regionsData={regionsData} />
    </div>
  );
}

export default AdRequests;
