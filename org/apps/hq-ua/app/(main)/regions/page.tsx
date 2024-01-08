import { COOKIE_KEYS } from "@business-layer/business-logic/configs/constants";
import { RegionService } from "@business-layer/services";
import HQPageTitle from "@presentational/molecules/HQPageTitle";
import DistrictManagement from "@presentational/organisms/DistrictManagement"
import { cookies } from "next/headers";

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

async function Regions() {
  const regionsData = await getRegions() ?? [];

  return (
    <div className="py-6 w-full h-screen overflow-y-auto">
      <HQPageTitle title="Danh sách quận" />
      <div className="flex flex-col w-full h-fit gap-6">
        <div className="w-full h-fit">
          <DistrictManagement regionsData={regionsData} />
        </div>
      </div>
    </div>
  )
}

export default Regions;
