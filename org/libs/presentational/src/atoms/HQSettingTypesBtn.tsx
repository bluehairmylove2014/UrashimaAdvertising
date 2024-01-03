'use client';

import HQFormsBox, {
  hqFormBoxProps,
} from '@presentational/molecules/HQFormsBox';
import { toggleClass } from '@utils/helpers';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  useLocationSettings,
  useAdFormSettings,
  useAdBoardTypeSettings,
  useReportTypeSettings,
} from '@business-layer/business-logic/lib/setting';

const settings: {
  [key: string]: {
    label: string;
    iconSrc: string;
  };
} = {
  location: { label: 'Loại địa điểm', iconSrc: '/assets/images/icons/map.png' },
  ad: {
    label: 'Hình thức quảng cáo',
    iconSrc: '/assets/images/icons/social-media.png',
  },
  adBoard: {
    label: 'Loại bảng quảng cáo',
    iconSrc: '/assets/images/icons/advertising.png',
  },
  report: {
    label: 'Hình thức báo cáo',
    iconSrc: '/assets/images/icons/message.png',
  },
};

type hqSettingTypesBtnProps = {
  type: 'location' | 'ad' | 'adBoard' | 'report';
};

function HQSettingTypesBtn({ type }: hqSettingTypesBtnProps) {
  const formBoxRef = useRef<HTMLDivElement>(null);
  const [settingInteractFunc, setSettingInteractFunc] = useState<
    Pick<hqFormBoxProps, 'getter' | 'setter'>
  >({
    getter: null,
    setter: null,
  });

  const {
    contextData: locationSettingData,
    onGetLocationSetting,
    onModifyLocationSetting,
    isModifying: isModifyingLocationSetting,
  } = useLocationSettings();
  const {
    contextData: adFormSettingData,
    onGetAdFormSetting,
    onModifyAdFormSetting,
    isModifying: isModifyingAdFormSetting,
  } = useAdFormSettings();
  const {
    contextData: adBoardSettingData,
    onGetAdBoardTypeSettings,
    onModifyAdBoardSetting,
    isModifying: isModifyingAdBoardSetting,
  } = useAdBoardTypeSettings();
  const {
    contextData: reportTypeSettingData,
    onGetReportTypeSettings,
    onModifyReportTypeSetting,
    isModifying: isModifyingReportTypeSetting,
  } = useReportTypeSettings();

  const handleToggleFormBox = () => {
    toggleClass(formBoxRef.current, 'activeHQFormBox');
  };

  const getSettingInteractFunc = () => {
    let sif = null;
    switch (type) {
      case 'location': {
        onGetLocationSetting();
        sif = {
          getter: onGetLocationSetting,
          setter: onModifyLocationSetting,
        };
        break;
      }
      case 'ad': {
        onGetAdFormSetting();
        sif = {
          getter: onGetAdFormSetting,
          setter: onModifyAdFormSetting,
        };
        break;
      }
      case 'adBoard': {
        onGetAdBoardTypeSettings();
        sif = {
          getter: onGetAdBoardTypeSettings,
          setter: onModifyAdBoardSetting,
        };
        break;
      }
      case 'report': {
        onGetReportTypeSettings();
        sif = {
          getter: onGetReportTypeSettings,
          setter: onModifyReportTypeSetting,
        };
        break;
      }
      default: {
        sif = {
          getter: null,
          setter: null,
        };
        break;
      }
    }
    setSettingInteractFunc(sif);
  };

  const getDynamicData = (): Pick<
    hqFormBoxProps,
    'contextData' | 'isModifying'
  > => {
    switch (type) {
      case 'location': {
        return {
          contextData: locationSettingData,
          isModifying: isModifyingLocationSetting,
        };
      }
      case 'ad': {
        return {
          contextData: adFormSettingData,
          isModifying: isModifyingAdFormSetting,
        };
      }
      case 'adBoard': {
        return {
          contextData: adBoardSettingData,
          isModifying: isModifyingAdBoardSetting,
        };
      }
      case 'report': {
        return {
          contextData: reportTypeSettingData,
          isModifying: isModifyingReportTypeSetting,
        };
      }
      default: {
        return {
          contextData: null,
          isModifying: false,
        };
      }
    }
  };

  useEffect(() => {
    getSettingInteractFunc();
  }, [type]);

  return (
    <>
      <button
        onClick={handleToggleFormBox}
        className="overflow-hidden rounded shadow-md py-4 px-6 bg-rose-50 hover:bg-rose-100 w-72 h-full flex flex-row justify-start items-center"
      >
        <Image src={settings[type].iconSrc} alt={type} width={40} height={40} />
        <p className="font-bold text-sm text-center ml-3 text-black">
          {settings[type].label}
        </p>
      </button>
      <HQFormsBox
        {...settingInteractFunc}
        {...getDynamicData()}
        ref={formBoxRef}
      />
    </>
  );
}

export default HQSettingTypesBtn;
