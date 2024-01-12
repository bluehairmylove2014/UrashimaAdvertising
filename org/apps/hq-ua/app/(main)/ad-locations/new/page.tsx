/* eslint-disable @typescript-eslint/no-unused-vars */
import { SettingService } from '@business-layer/services';
import { IBreadcrumb, ISetting } from '@business-layer/services/entities';
import { cookies } from 'next/headers';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import { HQ_PAGES } from '@constants/hqPages';
import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { getHostname } from '../../../../helper/hostname';
import NewAdLocation from '@presentational/organisms/NewAdLocation';

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

async function LocationEdit({ params }: { params: { id: string } }) {
  const locationTypes = await getLocationTypes();
  const adForms = await getAdForms();
  const breadcrumbsData: IBreadcrumb[] = [
    {
      href: HQ_PAGES.AD_LOCATIONS,
      label: 'Danh sách điểm quảng cáo',
      isCurrent: false,
    },
    {
      href: HQ_PAGES.AD_LOCATIONS_DETAIL + `/${params.id}`,
      label: 'Tạo mới điểm quảng cáo',
      isCurrent: true,
    },
  ];

  const renderOptions = (options: ISetting[] | null) => {
    return Array.isArray(options)
      ? [
          {
            name: 'Chưa chọn',
            value: '',
            defaultChecked: true,
          },
          ...options.map((o) => ({
            name: o.name,
            value: o.name,
            defaultChecked: false,
          })),
        ]
      : null;
  };

  return (
    <main className="py-6 w-full h-screen flex flex-col">
      <div className="flex flex-row justify-start items-start mb-8 w-full flex-shrink">
        <HQPageTitle
          title="TẠO MỚI ĐIỂM ĐẶT QUẢNG CÁO"
          breadcrumbsData={breadcrumbsData}
        />
      </div>
      <div className="w-full flex-grow overflow-auto">
        <NewAdLocation
          locationOptions={renderOptions(locationTypes)}
          adsFormOptions={renderOptions(adForms)}
        />
      </div>
    </main>
  );
}

export default LocationEdit;
