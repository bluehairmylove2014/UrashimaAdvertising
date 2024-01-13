'use client';

import { IBreadcrumb } from '@business-layer/services/entities';
import { HQ_PAGES } from '@constants/hqPages';
import { useNotification } from '@presentational/atoms/Notification';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import {
  newAccountFormSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import { useForm } from 'react-hook-form';
import { ROLE_LIST } from '@constants/roles';
import Image from 'next/image';
import WardIcon from '@assets/wardofficer.png';
import DistrictIcon from '@assets/districtofficer.png';
import HQIcon from '@assets/hqofficer.png';
import { useEffect, useRef, useState } from 'react';
import CrossIcon from '@presentational/atoms/CrossIcon';
import { addClass, removeClass, toggleClass } from '@utils/helpers';
import { useFetchRegions } from '@business-layer/business-logic/lib/regionManagement';
import FirstLayerSelect from '@presentational/atoms/FirstLayerSelect';
import SecondLayerSelect from '@presentational/atoms/SecondLayerSelect';
import { mulSelectOptionType } from '@presentational/atoms/MultipleLayerSelect';
import CustomButton from '@presentational/atoms/CustomButton';
import { useRegister } from '@business-layer/business-logic/lib/auth';

const breadcrumbsData: IBreadcrumb[] = [
  {
    href: HQ_PAGES.ACCOUNT_MANAGEMENT,
    label: 'Quản lý tài khoản',
    isCurrent: false,
  },
  {
    href: HQ_PAGES.NEW_ACCOUNT,
    label: 'Thêm mới tài khoản',
    isCurrent: true,
  },
];

type newAccountFormType = {
  fullName: string;
  password: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  role: string;
  unitUnderManagement: string;
};

function AccountManagement() {
  const resolver = useYupValidationResolver(newAccountFormSchema);
  const { handleSubmit, register, reset, setValue, watch } =
    useForm<newAccountFormType>({
      defaultValues: {
        fullName: '',
        password: '',
        email: '',
        dateOfBirth: '',
        phone: '',
        role: '',
        unitUnderManagement: '',
      },
      resolver,
    });
  const roleWatch = watch('role');
  const unitWatch = watch('unitUnderManagement');
  const [selectedUnit, setSelectedUnit] = useState<string[]>([]);
  const { showError, showReactHookFormError, showSuccess } = useNotification();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedMulLayerOption, setSelectedMulLayerOption] = useState<
    string | null
  >(null);
  const { data: regionsData } = useFetchRegions();
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
  const [districts, setDistricts] = useState<mulSelectOptionType | null>(null);
  const { onRegister, isLoading } = useRegister();

  useEffect(() => {
    if (regionsData) {
      const dists: mulSelectOptionType = { ['Huỷ']: [] };
      regionsData.forEach((r) => {
        const sameKey = Object.keys(dists).find((dk) => dk === r.district);
        if (sameKey) {
          dists[sameKey].push(r.ward);
        } else {
          dists[r.district] = ['Toàn bộ', r.ward];
        }
      });
      setDistricts(dists);
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

  // methods
  const onSuccessSubmit = (data: newAccountFormType) => {
    onRegister(data)
      .then((msg) => {
        showSuccess(msg);
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        reset();
      });
  };
  function handleSelectRole(role: string) {
    setValue('role', role);
    if (role === ROLE_LIST.HQ) {
      setSelectedUnit([...selectedUnit, 'all']);
      setValue('unitUnderManagement', 'all');
    } else {
      setSelectedUnit([]);
      setValue('unitUnderManagement', '');
    }
  }
  function handleDeleteUnit(unit: string) {
    setSelectedUnit(selectedUnit.filter((u) => u !== unit));
    setValue(
      'unitUnderManagement',
      unitWatch
        .split('|')
        .filter((u) => u !== unit)
        .join('|')
    );
    showSuccess('Xoá thành công');
  }
  const onFirstLayerSelect = (option: string, index: number) => {
    if (index > 0) {
      if (roleWatch === ROLE_LIST.DISTRICT_OFFICER) {
        toggleDropdown();
        handleAddUnit(option);
      } else {
        setSelectedOption(option);
        setSelectedMulLayerOption(null);
        openMulLayerDropdown();
      }
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
  const handleAddUnit = (unit: string) => {
    let unitAfterCheck = null;
    switch (roleWatch) {
      case ROLE_LIST.WARD_OFFICER: {
        if (unitWatch.trim().length === 0) {
          unitAfterCheck = unit;
          break;
        } else if (unitWatch.trim().length > 0) {
          showError('Cán bộ Phường quản lý TỐI ĐA 1 PHƯỜNG');
        } else if (unitWatch.indexOf(',') === -1) {
          showError('Cán bộ Phường chỉ quản lý 1 phường trong 1 quận');
        } else {
          unitAfterCheck = unit;
        }
        break;
      }
      case ROLE_LIST.DISTRICT_OFFICER: {
        if (unitWatch.trim().length === 0) {
          unitAfterCheck = unit;
          break;
        }
        const unitCommaSplit = unit.split(', ');
        if (!unitWatch.includes(unitCommaSplit[unitCommaSplit.length - 1])) {
          showError('Cán bộ Quận quản lý TỐI ĐA 1 QUẬN');
        } else if (unitCommaSplit.length === 1 && unitWatch.includes(unit)) {
          unitAfterCheck = 'alldistrict';
        } else if (unitWatch.includes(unit)) {
          showError('Bạn đã chọn khu vực này rồi!');
        } else {
          unitAfterCheck = unit;
        }
        break;
      }
      case ROLE_LIST.HQ: {
        unitAfterCheck = 'all';
        break;
      }
      default: {
        console.error('Vai trò không hợp lệ');
        break;
      }
    }
    if (unitAfterCheck === 'alldistrict') {
      setSelectedUnit([unit]);
      setValue('unitUnderManagement', unit);
      showSuccess('Thêm thành công');
    } else if (unitAfterCheck) {
      setSelectedUnit([...selectedUnit, unit]);
      setValue(
        'unitUnderManagement',
        unitWatch.trim().length > 0 ? unitWatch + `|${unit}` : unit
      );
      showSuccess('Thêm thành công');
    }
  };

  return (
    <main className="py-6 w-full h-screen flex flex-col">
      <div className="flex flex-row justify-between items-start mb-8 w-full flex-shrink">
        <HQPageTitle
          title="Thêm mới tài khoản"
          breadcrumbsData={breadcrumbsData}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSuccessSubmit, showReactHookFormError)}
        className="grid grid-cols-6 gap-4"
      >
        <div className="col-span-6 flex flex-col justify-center items-start">
          <label
            htmlFor="fullName-new-account"
            className="font-semibold opacity-70 text-xs mb-1"
          >
            Họ và tên*
          </label>
          <input
            type="text"
            id="fullName-new-account"
            {...register('fullName')}
            className="outline-none border-zinc-400 bg-transparent border-solid border rounded px-4 py-2 w-full h-fit text-xs"
          />
        </div>
        <div className="col-span-6 flex flex-col justify-center items-start">
          <label
            htmlFor="password-new-account"
            className="font-semibold opacity-70 text-xs mb-1"
          >
            Mật khẩu*
          </label>
          <input
            type="password"
            id="password-new-account"
            {...register('password')}
            className="outline-none border-zinc-400 bg-transparent border-solid border rounded px-4 py-2 w-full h-fit text-xs"
          />
        </div>
        <div className="col-span-2 flex flex-col justify-center items-start">
          <label
            htmlFor="email-new-account"
            className="font-semibold opacity-70 text-xs mb-1"
          >
            Email*
          </label>
          <input
            type="email"
            id="email-new-account"
            {...register('email')}
            className="outline-none border-zinc-400 bg-transparent border-solid border rounded px-4 py-2 w-full h-fit text-xs"
          />
        </div>
        <div className="col-span-2 flex flex-col justify-center items-start">
          <label
            htmlFor="phone-new-account"
            className="font-semibold opacity-70 text-xs mb-1"
          >
            Số điện thoại*
          </label>
          <input
            type="tel"
            id="phone-new-account"
            {...register('phone')}
            className="outline-none border-zinc-400 bg-transparent border-solid border rounded px-4 py-2 w-full h-fit text-xs"
          />
        </div>
        <div className="col-span-2 flex flex-col justify-center items-start">
          <label
            htmlFor="dateOfBirth-new-account"
            className="font-semibold opacity-70 text-xs mb-1"
          >
            Ngày sinh*
          </label>
          <input
            type="date"
            id="dateOfBirth-new-account"
            {...register('dateOfBirth')}
            onKeyDown={() => false}
            className="outline-none border-zinc-400 bg-transparent border-solid border rounded px-4 py-2 w-full h-fit text-xs"
          />
        </div>

        <div className="col-span-3 flex flex-col justify-center items-start">
          <label
            htmlFor="role"
            className="font-semibold opacity-70 text-xs mb-1"
          >
            Vai trò*
          </label>
          <input
            type="text"
            id="role"
            {...register('role')}
            className="hidden"
          />
          <div className="w-full grid grid-cols-3 gap-4 py-4">
            <button
              type="button"
              onClick={() => handleSelectRole(ROLE_LIST.WARD_OFFICER)}
              className={`${
                roleWatch === ROLE_LIST.WARD_OFFICER
                  ? '!bg-blue-200'
                  : 'bg-white'
              } flex flex-col justify-center items-center w-full py-3 shadow-md rounded-md col-span-1 border border-zinc-200 border-solid gap-2 hover:bg-blue-100 transition-colors`}
            >
              <Image src={WardIcon} alt="Phường" width={80} height={80} />
              <p>Cán bộ Phường</p>
            </button>
            <button
              type="button"
              onClick={() => handleSelectRole(ROLE_LIST.DISTRICT_OFFICER)}
              className={`${
                roleWatch === ROLE_LIST.DISTRICT_OFFICER
                  ? '!bg-blue-200'
                  : 'bg-white'
              } flex flex-col justify-center items-center w-full py-3 shadow-md rounded-md col-span-1 border border-zinc-200 border-solid gap-2 hover:bg-blue-100 transition-colors`}
            >
              <Image src={DistrictIcon} alt="Quận" width={80} height={80} />
              <p>Cán bộ Quận</p>
            </button>
            <button
              type="button"
              onClick={() => handleSelectRole(ROLE_LIST.HQ)}
              className={`${
                roleWatch === ROLE_LIST.HQ ? '!bg-blue-200' : 'bg-white'
              } flex flex-col justify-center items-center w-full py-3 shadow-md rounded-md col-span-1 border border-zinc-200 border-solid gap-2 hover:bg-blue-100 transition-colors`}
            >
              <Image
                src={HQIcon}
                alt="Cán bộ Sở VH-TT"
                width={80}
                height={80}
              />
              <p>Cán bộ Sở VH-TT</p>
            </button>
          </div>
        </div>

        <div className="col-span-3 flex flex-col ml-3">
          <label
            htmlFor="role"
            className="font-semibold opacity-70 text-xs mb-1"
          >
            Khu vực quản lý (Chọn vai trò trước)*
          </label>
          <div className="w-full h-fit py-4 flex flex-row gap-3 justify-start items-start flex-wrap">
            <input
              type="text"
              id="unitUnderManagement"
              {...register('unitUnderManagement')}
              className="hidden"
            />
            {selectedUnit.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() =>
                  roleWatch !== ROLE_LIST.HQ && handleDeleteUnit(u)
                }
                className={`${
                  roleWatch !== ROLE_LIST.HQ
                    ? 'button-swap-text-ani hover:bg-red-500'
                    : 'cursor-default'
                } font-semibold bg-blue-100 rounded-xl shadow-sm w-fit h-fit relative transition-colors `}
              >
                <p className="py-2 px-4 text-black text-[0.65rem]">
                  {u === 'all' ? 'Toàn bộ TP.HCM' : u}
                </p>
                {roleWatch !== ROLE_LIST.HQ ? (
                  <span className="text-white text-[0.65rem]">
                    <CrossIcon />
                  </span>
                ) : (
                  <></>
                )}
              </button>
            ))}
            {roleWatch === ROLE_LIST.HQ ? (
              <></>
            ) : (
              <div className="relative w-fit h-fit">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  disabled={roleWatch.trim().length === 0}
                  className="font-semibold bg-green-600 rounded-xl shadow-sm w-fit h-fit relative hover:bg-green-700 transition-colors disabled:cursor-not-allowed disabled:bg-zinc-400"
                >
                  <p className="py-2 px-4 text-white text-[0.65rem]">
                    + Thêm khu vực
                  </p>
                </button>
                <FirstLayerSelect
                  ref={selectRef}
                  selectedOption={selectedOption}
                  onSelect={onFirstLayerSelect}
                  options={districts}
                  maxHeight={'max-h-[15rem]'}
                />
                <SecondLayerSelect
                  ref={secondLayerRef}
                  firstLayerSelectedOption={selectedOption}
                  selectedOption={selectedMulLayerOption}
                  onSelect={onSecondLayerSelect}
                  options={districts}
                  maxHeight={'max-h-[15rem]'}
                />
              </div>
            )}
            <br />
            {roleWatch === ROLE_LIST.DISTRICT_OFFICER ? (
              <small className="text-red-600 w-full block">
                Lưu ý:
                <br />
                <span>*Cán bộ Quận quản lý tối đa 1 quận</span>
              </small>
            ) : roleWatch === ROLE_LIST.WARD_OFFICER ? (
              <small className="text-red-600 w-full block">
                Lưu ý:
                <br />
                <span>*Cán bộ Phường quản lý tối đa 1 phường</span>
                <br />
                <span>*Cán bộ Phường chỉ quản lý 1 phường trong 1 quận</span>
              </small>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="col-span-6 mt-4 grid place-items-center">
          <div className="h-fit w-1/3">
            <CustomButton
              style="fill-primary"
              type="submit"
              loading={isLoading}
            >
              Tạo tài khoản
            </CustomButton>
          </div>
        </div>
      </form>
    </main>
  );
}

export default AccountManagement;
