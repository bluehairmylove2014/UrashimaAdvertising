'use client';
import { IBreadcrumb } from '@business-layer/services/entities';
import { OFFICER_PAGES } from '@constants/officerPages';
import Breadcrumbs from '@presentational/molecules/Breadcrumbs';
import CreateNewApproveForm from '@presentational/organisms/CreateNewApproveForm';
import {
  useAdFormSettings,
  useLocationSettings,
} from '@business-layer/business-logic/lib/setting';
import { modernSelectOptionType } from '@presentational/atoms/ModernSelect';
import { useEffect, useState } from 'react';

const breadcrumbsData: IBreadcrumb[] = [
  {
    href: OFFICER_PAGES.DASHBOARD,
    label: 'Trang chủ',
    isCurrent: false,
  },
  {
    href: OFFICER_PAGES.REQUEST_LIST,
    label: 'Danh sách cấp phép',
    isCurrent: false,
  },
  {
    href: OFFICER_PAGES.NEW_APPROVE,
    label: 'Tạo cấp phép',
    isCurrent: true,
  },
];

function NewApprove() {
  const { onGetAdFormSetting } = useAdFormSettings();
  const { onGetLocationSetting } = useLocationSettings();
  const [locationOptions, setLocationOptions] = useState<
    modernSelectOptionType[] | null
  >(null);
  const [adsFormOptions, setAdsFormOptions] = useState<
    modernSelectOptionType[] | null
  >(null);

  useEffect(() => {
    onGetAdFormSetting()
      .then((data) => {
        setLocationOptions([
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
    onGetLocationSetting().then((data) => {
      setAdsFormOptions([
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-start justify-start mb-8">
        <h1 className="w-full font-bold !text-base">CẤP PHÉP QUẢNG CÁO</h1>
        <Breadcrumbs bcList={breadcrumbsData} />
      </div>
      <CreateNewApproveForm
        adsFormOptions={adsFormOptions ?? []}
        locationTypeOptions={locationOptions ?? []}
      />
    </div>
  );
}

export default NewApprove;
