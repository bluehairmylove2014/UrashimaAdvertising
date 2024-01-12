import HQPageTitle from '@presentational/molecules/HQPageTitle';
import DistrictManagement from '@presentational/organisms/DistrictManagement';

async function Regions() {
  return (
    <div className="py-6 w-full h-screen overflow-y-auto">
      <HQPageTitle title="Danh sách quận" />
      <div className="flex flex-col w-full h-fit gap-6">
        <div className="w-full h-fit">
          <DistrictManagement />
        </div>
      </div>
    </div>
  );
}

export default Regions;
