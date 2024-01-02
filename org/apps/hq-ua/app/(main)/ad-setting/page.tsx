import HQPageTitle from '@presentational/molecules/HQPageTitle';
import HQSettingTypesBtn from '@presentational/atoms/HQSettingTypesBtn';

function AdSetting() {
  return (
    <div className="py-6 w-full h-screen overflow-y-auto">
      <HQPageTitle title="thiết lập chung" />
      <div className="flex flex-col w-full h-fit gap-6">
        <div className="w-full h-fit">
          <HQSettingTypesBtn type="location" />
        </div>
        <div className="w-full h-fit">
          <HQSettingTypesBtn type="report" />
        </div>

        <div className="w-full h-fit">
          <HQSettingTypesBtn type="ad" />
        </div>
        <div className="w-full h-fit">
          <HQSettingTypesBtn type="adBoard" />
        </div>
      </div>
    </div>
  );
}

export default AdSetting;
