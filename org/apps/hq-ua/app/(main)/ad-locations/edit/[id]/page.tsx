/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdsService, SettingService } from '@business-layer/services';
import EditAdDetail from '@presentational/organisms/EditAdDetail';
import { IBreadcrumb, ISetting } from '@business-layer/services/entities';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@business-layer/business-logic/configs/constants';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import CommonLoader from '@presentational/atoms/CommonLoader';
import { HQ_PAGES } from '@constants/hqPages';

const settingService = new SettingService();
async function getLocationTypes() {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
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
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
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
async function getAdBoardTypes() {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
    if (token) {
      return await settingService.getAdBoardTypesSettings({
        token,
      });
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

const officerService = new AdsService();
async function getAdLocationDetail(id: number) {
  try {
    const token = cookies().get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null;
    if (token) {
      return await officerService.getOfficerLocationDetail({
        adId: id,
        token: token,
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
  const adBoardTypes = await getAdBoardTypes();
  const adData = await getAdLocationDetail(Number.parseInt(params.id));
  const breadcrumbsData: IBreadcrumb[] = [
    {
      href: HQ_PAGES.AD_LOCATIONS,
      label: 'Danh sách điểm quảng cáo',
      isCurrent: false,
    },
    {
      href: HQ_PAGES.AD_LOCATIONS_DETAIL + `/${params.id}`,
      label: 'Chi tiết điểm quảng cáo',
      isCurrent: false,
    },
    {
      href: HQ_PAGES.AD_LOCATIONS_DETAIL + `/${params.id}`,
      label: 'Chỉnh sửa',
      isCurrent: true,
    },
  ];

  const renderOptions = (options: ISetting[] | null) => {
    return Array.isArray(options)
      ? options.map((o) => ({
          name: o.name,
          value: o.name,
          defaultChecked: false,
        }))
      : null;
  };

  return (
    <main className="py-6 w-full h-screen flex flex-col">
      {adData ? (
        <>
          <div className="flex flex-row justify-start items-start mb-8 w-full flex-shrink">
            <HQPageTitle
              title="CHỈNH SỬA ĐIỂM ĐẶT QUẢNG CÁO"
              breadcrumbsData={breadcrumbsData}
            />
          </div>
          <div className="w-full flex-grow overflow-auto">
            <EditAdDetail
              customBackHref={HQ_PAGES.AD_LOCATIONS_DETAIL + `/${params.id}`}
              adData={adData}
              locationOptions={renderOptions(locationTypes)}
              adsFormOptions={renderOptions(adForms)}
              adsTypeOptions={renderOptions(adBoardTypes)}
            />
          </div>
        </>
      ) : (
        <CommonLoader />
      )}
    </main>
  );
}

export default LocationEdit;
