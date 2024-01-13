import HQPageTitle from '@presentational/molecules/HQPageTitle';
import AdLocationsTable from '@presentational/organisms/AdLocationsTable';
import LocationTableFilterSelect from '@presentational/molecules/LocationTableFilterSelect';
import LocationTableSearchBox from '@presentational/molecules/LocationTableSearchBox';
import { SettingService } from '@business-layer/services';
import { cookies } from 'next/dist/client/components/headers';
import { HQ_PAGES } from '@constants/hqPages';
import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { getHostname } from '../../../helper/hostname';
import AddNewLocationBtn from './addNewLocationBtn';

const settingService = new SettingService();
async function getLocationTypes() {
  try {
    const token =
      cookies().get(getCustomAccessTokenKey(getHostname()))?.value ?? null;
    if (token) {
      return await settingService.getLocationSettings({
        token,
      });
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
async function getAdForms() {
  try {
    const token =
      cookies().get(getCustomAccessTokenKey(getHostname()))?.value ?? null;
    if (token) {
      return await settingService.getAdFormsSettings({
        token,
      });
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
async function AdLocations() {
  const locationTypes = await getLocationTypes();
  const adForms = await getAdForms();
  return (
    <div className="py-6 w-full h-screen">
      <HQPageTitle title="Danh sách điểm quảng cáo" />
      <div className="flex flex-row gap-4 justify-between mt-4 mb-8 w-full">
        <LocationTableSearchBox />
        <div className="flex flex-row justify-end flex-grow gap-2">
          <LocationTableFilterSelect
            type="adsForm"
            options={
              Array.isArray(adForms)
                ? [
                    ...adForms.map((adf) => ({
                      name: adf.name,
                      value: adf.name,
                      defaultChecked: false,
                    })),
                    {
                      name: 'Tất cả hình thức',
                      value: null,
                      defaultChecked: true,
                    },
                  ]
                : null
            }
            defaultValue={'Tất cả hình thức'}
          />
          <LocationTableFilterSelect
            type="locationType"
            options={
              Array.isArray(locationTypes)
                ? [
                    ...locationTypes.map((lot) => ({
                      name: lot.name,
                      value: lot.name,
                      defaultChecked: false,
                    })),
                    {
                      name: 'Tất cả loại địa điểm',
                      value: null,
                      defaultChecked: true,
                    },
                  ]
                : null
            }
            defaultValue={'Tất cả loại địa điểm'}
          />
          <AddNewLocationBtn />
        </div>
      </div>
      <AdLocationsTable customDetailHref={HQ_PAGES.AD_LOCATIONS_DETAIL} />
    </div>
  );
}

export default AdLocations;
