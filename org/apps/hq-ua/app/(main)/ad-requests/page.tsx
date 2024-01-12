import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { RegionService } from '@business-layer/services';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import AdRequestTable from '@presentational/organisms/AdRequestTable';
import { getHostname } from '../../../helper/hostname';
import { cookies } from 'next/headers';

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

async function AdRequests() {
  const regionsData = await getRegions();
  return (
    <div className="py-6 w-full h-screen overflow-y-auto scrollbar-hide">
      <HQPageTitle title="Các yêu cầu từ Phường, Quận" />
      <AdRequestTable regionsData={regionsData} isOfficer={false} />
    </div>
  );
}

export default AdRequests;
