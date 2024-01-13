'use client';
import AdLocationsTable from '@presentational/organisms/AdLocationsTable';
import { IBreadcrumb } from '@business-layer/services/entities';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import { OFFICER_PAGES } from '@constants/officerPages';
import LocationTableFilterSelect from '@presentational/molecules/LocationTableFilterSelect';
import LocationTableSearchBox from '@presentational/molecules/LocationTableSearchBox';
import {
  useAdFormSettings,
  useLocationSettings,
} from '@business-layer/business-logic/lib/setting';
import { useEffect, useState } from 'react';
import { modernSelectOptionType } from '@presentational/atoms/ModernSelect';

const breadcrumbsData: IBreadcrumb[] = [
  {
    href: OFFICER_PAGES.DASHBOARD,
    label: 'Trang chủ',
    isCurrent: false,
  },
  {
    href: OFFICER_PAGES.ADS_LOCATION,
    label: 'Danh sách điểm quảng cáo',
    isCurrent: true,
  },
];

function AdLocations() {
  const { onGetAdFormSetting } = useAdFormSettings();
  const { onGetLocationSetting } = useLocationSettings();
  const [adForms, setAdForms] = useState<modernSelectOptionType[] | null>(null);
  const [locationTypes, setLocationTypes] = useState<
    modernSelectOptionType[] | null
  >(null);

  useEffect(() => {
    onGetAdFormSetting()
      .then((data) => {
        setAdForms([
          {
            name: 'Tất cả hình thức',
            value: null,
            defaultChecked: true,
          },
          ...data.map((d) => ({
            name: d.name,
            value: d.name,
            defaultChecked: false,
          })),
        ]);
      })
      .catch((error) => console.error(error));
    onGetLocationSetting()
      .then((data) => {
        setLocationTypes([
          {
            name: 'Tất cả loại địa điểm',
            value: null,
            defaultChecked: true,
          },
          ...data.map((d) => ({
            name: d.name,
            value: d.name,
            defaultChecked: false,
          })),
        ]);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-start justify-start mb-8">
        <h1 className="w-full font-bold !text-base">
          DANH SÁCH ĐIỂM ĐẶT QUẢNG CÁO
        </h1>
        <Breadcrumbs bcList={breadcrumbsData} />
      </div>
      <div className="flex flex-row gap-4 justify-between mb-8 w-full">
        <LocationTableSearchBox />
        <div className="flex flex-row justify-end flex-grow gap-2">
          <LocationTableFilterSelect
            type="adsForm"
            options={adForms}
            defaultValue={'Tất cả hình thức'}
          />
          <LocationTableFilterSelect
            type="locationType"
            options={locationTypes}
            defaultValue={'Tất cả loại địa điểm'}
          />
        </div>
      </div>
      <AdLocationsTable />
    </div>
  );
}

export default AdLocations;
