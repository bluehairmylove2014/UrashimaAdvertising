/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdsService } from '@business-layer/services';
import EditAdDetail from '@presentational/organisms/EditAdDetail';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import { IBreadcrumb } from '@business-layer/services/entities';
import { OFFICER_PAGES } from '@constants/officerPages';
import { LOCATION_TYPES } from '../../../../../constants/locationTypes';
import { ADS_FORM } from '../../../../../constants/adsForm';
import { cookies } from 'next/headers';
import { ADS_TYPE } from '../../../../../constants/adsType';
import { getCustomAccessTokenKey } from '@business-layer/business-logic/helper/customKey';
import { getHostname } from '../../../../../helper/hostname';

const officerService = new AdsService();
async function getAdLocationDetail(boardId: number) {
  try {
    const token =
      cookies().get(getCustomAccessTokenKey(getHostname()))?.value ?? null;
    if (token) {
      return await officerService.getOfficerLocationDetail({
        adId: boardId,
        token: token,
      });
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
async function AdBoards({ params }: { params: { boardId: string } }) {
  const adData = await getAdLocationDetail(Number.parseInt(params.boardId));
  const breadcrumbsData: IBreadcrumb[] = [
    {
      href: OFFICER_PAGES.DASHBOARD,
      label: 'Trang chủ',
      isCurrent: false,
    },
    {
      href: OFFICER_PAGES.ADS_LOCATION,
      label: 'Danh sách điểm quảng cáo',
      isCurrent: false,
    },
    {
      href: OFFICER_PAGES.ADS_BOARD + `/${params.boardId}`,
      label: 'Chi tiết điểm quảng cáo',
      isCurrent: false,
    },
    {
      href: OFFICER_PAGES.ADS_BOARD_EDIT + `/${params.boardId}`,
      label: 'Chỉnh sửa',
      isCurrent: true,
    },
  ];
  const [defaultLocationOption, ...locationOptions] = LOCATION_TYPES;
  const [defaultAdsFormOption, ...adsFormOptions] = ADS_FORM;
  const [defaultAdsTypeOption, ...adsTypeOptions] = ADS_TYPE;

  return (
    <main className="container mx-auto px-4 py-12">
      {adData ? (
        <>
          <div className="flex flex-col justify-start items-start mb-8 ">
            <h1 className="font-bold !text-base">
              CHỈNH SỬA ĐIỂM ĐẶT QUẢNG CÁO
            </h1>
            <Breadcrumbs bcList={breadcrumbsData} />
          </div>
          <EditAdDetail
            adData={adData}
            locationOptions={locationOptions}
            adsFormOptions={adsFormOptions}
            adsTypeOptions={adsTypeOptions}
          />
        </>
      ) : (
        <></>
      )}
    </main>
  );
}

export default AdBoards;
