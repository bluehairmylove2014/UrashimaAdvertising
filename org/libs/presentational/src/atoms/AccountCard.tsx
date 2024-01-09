'use client';

import { IAccountDetail } from '@business-layer/services/entities';
import WardOfficer from '@assets/wardofficer.png';
import DistrictOfficer from '@assets/districtofficer.png';
import HQOfficer from '@assets/hqofficer.png';
import Image, { StaticImageData } from 'next/image';
import CrossIcon from './CrossIcon';
import MultipleLayerSelect, {
  mulSelectOptionType,
} from './MultipleLayerSelect';
import { useEffect, useRef, useState } from 'react';
import { addClass, removeClass, toggleClass, formatDate } from '@utils/helpers';
import FirstLayerSelect from './FirstLayerSelect';
import SecondLayerSelect from './SecondLayerSelect';
import { useFetchRegions } from '@business-layer/business-logic/lib/regionManagement';
import { ROLE_LIST } from '@constants/roles';
import { useUnitModifyAccount } from '@business-layer/business-logic/lib/account';
import { useNotification } from './Notification';
import ButtonLoader from './ButtonLoader';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { getAllAccountResponseType } from '@business-layer/services';

function getRoleIcon(role: string): {
  roleIcon: StaticImageData;
  roleName: string;
} {
  switch (role) {
    case ROLE_LIST.WARD_OFFICER: {
      return { roleIcon: WardOfficer, roleName: 'Cán bộ phường' };
    }
    case ROLE_LIST.DISTRICT_OFFICER: {
      return { roleIcon: DistrictOfficer, roleName: 'Cán bộ quận' };
    }
    case ROLE_LIST.HQ: {
      return { roleIcon: HQOfficer, roleName: 'Cán bộ Sở VH-TT' };
    }
    default: {
      console.error('ROLE INVALID');
      return { roleIcon: WardOfficer, roleName: 'Vai trò lạ' };
    }
  }
}
function getUnitList(unit: string): string[] {
  return unit.split('|');
}

function AccountCard({
  accountData,
  handleRefetch,
}: {
  accountData: IAccountDetail;
  handleRefetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<getAllAccountResponseType, Error>>;
}) {
  const { roleIcon, roleName } = getRoleIcon(accountData.role);
  const isHQ = Boolean(accountData.role === ROLE_LIST.HQ);
  const unitList = getUnitList(accountData.unitUnderManagement);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedMulLayerOption, setSelectedMulLayerOption] = useState<
    string | null
  >(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const secondLayerRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    toggleClass(selectRef.current, '!block');
  };
  const openMulLayerDropdown = () => {
    addClass(secondLayerRef.current, '!block');
  };
  const closeMulLayerDropdown = () => {
    removeClass(secondLayerRef.current, '!block');
  };
  const { data: regionsData } = useFetchRegions();
  const [districts, setDistricts] = useState<mulSelectOptionType | null>(null);
  const { onUnitModifyAccount, isLoading } = useUnitModifyAccount();
  const { showError, showSuccess } = useNotification();

  useEffect(() => {
    if (regionsData) {
      const districts: mulSelectOptionType = { ['Huỷ']: [] };
      regionsData.forEach((r) => {
        const sameKey = Object.keys(districts).find((dk) => dk === r.district);
        if (sameKey) {
          districts[sameKey].push(r.ward);
        } else {
          districts[r.district] = ['Toàn bộ', r.ward];
        }
      });
      setDistricts(districts);
    }
  }, [regionsData]);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      // Handle class changes here
      mutationsList.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          selectRef.current
        ) {
          setSelectedOption(null);
          setSelectedMulLayerOption(null);
          !selectRef.current.classList.contains('block') &&
            closeMulLayerDropdown();
        }
      });
    });

    // Start observing the target node (myDivRef.current) for attribute changes
    selectRef.current &&
      observer.observe(selectRef.current, { attributes: true });

    // Cleanup the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  const onFirstLayerSelect = (option: string, index: number) => {
    if (index > 0) {
      setSelectedOption(option);
      setSelectedMulLayerOption(null);
      openMulLayerDropdown();
    } else {
      setSelectedOption(null);
      setSelectedMulLayerOption(null);
      toggleDropdown();
    }
  };
  const onSecondLayerSelect = (option: string, index: number) => {
    if (index > 0) {
      handleAddUnit(`${option}, ${selectedOption}`);
      setSelectedMulLayerOption(option);
    } else {
      selectedOption && handleAddUnit(selectedOption);
      setSelectedMulLayerOption(null);
    }
    toggleDropdown();
  };

  const handleDeleteUnit = (unit: string) => {
    onUnitModifyAccount({
      ...accountData,
      unitUnderManagement: unitList.filter((u) => u !== unit).join('|'),
    })
      .then((msg) => {
        showSuccess(msg);
        handleRefetch();
      })
      .catch((error) => showError(error.message));
  };
  const handleAddUnit = (unit: string) => {
    onUnitModifyAccount({
      ...accountData,
      unitUnderManagement: [...unitList, unit].join('|'),
    })
      .then((msg) => {
        showSuccess(msg);
        handleRefetch();
      })
      .catch((error) => showError(error.message));
  };

  return (
    <div className="grid grid-cols-9 grid-rows-1 gap-6 border border-zinc-400 border-solid shadow-sm rounded-md w-full p-2">
      <div className="col-span-2 flex flex-col justify-center items-center gap-2 overflow-hidden w-full border-r border-zinc-200">
        <Image src={roleIcon} alt={accountData.role} width={60} height={60} />
        <span className="text-xs font-semibold text-black line-clamp-1">
          {roleName}
        </span>
      </div>
      <div className="col-span-4 w-full flex flex-col justify-center items-start border-r border-zinc-200">
        <p className="text-xs line-clamp-1">
          <b>Email: </b>
          <span>{accountData.email}</span>
        </p>
        <p className="text-xs line-clamp-1">
          <b>Họ tên: </b>
          <span>{accountData.fullName}</span>
        </p>
        <p className="text-xs line-clamp-1">
          <b>Ngày sinh: </b>
          <span>
            {formatDate(new Date(accountData.dateOfBirth)).dateMonthYear}
          </span>
        </p>
        <p className="text-xs line-clamp-1">
          <b>Điện thoại: </b>
          <span>{accountData.phone}</span>
        </p>
      </div>
      <div className="col-span-3 w-full flex flex-row flex-wrap gap-3">
        {unitList.map((u) => (
          <button
            key={u}
            onClick={() => !isHQ && handleDeleteUnit(u)}
            className={`${
              isHQ
                ? 'cursor-text pointer-events-none'
                : 'hover:bg-red-500 transition-colors button-swap-text-ani'
            } font-semibold bg-blue-100 rounded-xl shadow-sm w-fit h-fit relative `}
          >
            <p className="py-2 px-4 text-black text-[0.65rem]">
              {isHQ ? 'Toàn bộ TP.HCM' : u}
            </p>
            {isHQ ? (
              <></>
            ) : (
              <span className="text-white text-[0.65rem]">
                <CrossIcon />
              </span>
            )}
          </button>
        ))}
        {isHQ ? (
          <></>
        ) : (
          <div className="relative w-fit h-fit">
            <button
              onClick={toggleDropdown}
              disabled={isLoading}
              className="font-semibold bg-green-600 rounded-xl shadow-sm w-fit h-fit relative hover:bg-green-700 transition-colors disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {isLoading ? (
                <div className="py-2 px-4 text-white text-[0.65rem]">
                  <ButtonLoader label="Chờ..." />
                </div>
              ) : (
                <p className="py-2 px-4 text-white text-[0.65rem]">+ Thêm</p>
              )}
            </button>
            <FirstLayerSelect
              ref={selectRef}
              selectedOption={selectedOption}
              onSelect={onFirstLayerSelect}
              options={districts}
            />
            <SecondLayerSelect
              ref={secondLayerRef}
              firstLayerSelectedOption={selectedOption}
              selectedOption={selectedMulLayerOption}
              onSelect={onSecondLayerSelect}
              options={districts}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountCard;
