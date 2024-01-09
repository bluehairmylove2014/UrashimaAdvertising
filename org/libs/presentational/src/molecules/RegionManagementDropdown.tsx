'use client';
import CustomButton from '@presentational/atoms/CustomButton';
import {
  useFetchRegions,
  useGetRegions,
  useSetRegions,
} from '@business-layer/business-logic/lib/regionManagement';
import CommonLoader from '@presentational/atoms/CommonLoader';
import { toggleClass } from '@utils/helpers';
import { useEffect, useRef, useState } from 'react';
import { IRegion } from '@business-layer/services/entities/region';
import { useNotification } from '@presentational/atoms/Notification';
import { useRouter } from 'next/navigation';

function RegionManagementDropdown() {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const { data: regionData } = useFetchRegions();
  const selectedRegions = useGetRegions();
  const { setRegions } = useSetRegions();
  const { showSuccess } = useNotification();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [regionsChose, setRegionsChose] = useState<string[]>(
    selectedRegions ? [...selectedRegions] : []
  );

  useEffect(() => {
    if (regionData && isFirstRender) {
      setRegions(regionData.map((r) => `${r.ward}, ${r.district}`));
    }
  }, [regionData]);

  useEffect(() => {
    setRegionsChose(selectedRegions ? [...selectedRegions] : []);
  }, [selectedRegions]);

  const handleClickRegion = (region: IRegion): void => {
    const target = `${region.ward}, ${region.district}`;

    setRegionsChose(
      regionsChose.includes(target)
        ? regionsChose.filter((r) => r !== target)
        : [...regionsChose, target]
    );
  };

  const isAbleConfirm = (): boolean => {
    if (!selectedRegions) {
      return regionsChose.length === 0 ? false : true;
    } else {
      if (selectedRegions.length !== regionsChose.length) {
        return true;
      } else if (selectedRegions.every((e) => regionsChose.includes(e))) {
        return false;
      }
      return true;
    }
  };

  const applyChange = () => {
    setRegions(regionsChose);
    router.refresh();
    showSuccess('Thay đổi thành công');
    handleClose();
  };

  const handleClose = () => {
    toggleClass(dropdownRef.current, '!block');
    setRegionsChose(selectedRegions ? [...selectedRegions] : []);
  };

  return (
    <>
      <button
        className="text-xs text-white hover:text-orange-400 transition-colors font-semibold"
        onClick={() => toggleClass(dropdownRef.current, '!block')}
      >
        Xem khu vực&nbsp;<i className="fi fi-sr-caret-down"></i>
      </button>
      <div
        ref={dropdownRef}
        className="fixed top-0 left-0 w-screen h-screen bg-black/60 hidden"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-fit bg-white overflow-hidden rounded p-6">
          <div className="flex flex-row justify-between items-center mb-5">
            <div className="w-5 h-5"></div>
            <div className="text-center">
              <h4>TUỲ CHỈNH KHU VỰC XEM</h4>
              <p>
                Lưu ý: Bạn chỉ có thể chọn xem các khu vực bạn hiện tại đang
                được phép quản lý
              </p>
            </div>
            <button
              className="w-5 h-5 bg-black/50 text-white text-[0.65rem] rounded-full hover:bg-black"
              onClick={handleClose}
            >
              x
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-52">
            {regionData ? (
              regionData.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleClickRegion(region)}
                  className={`w-full py-3 text-xs font-semibold  whitespace-normal rounded hover:bg-cyan-200 hover:text-black transition-colors ${
                    regionsChose &&
                    regionsChose.findIndex(
                      (r) => r === `${region.ward}, ${region.district}`
                    ) !== -1
                      ? '!bg-cyan-300 text-black'
                      : 'bg-zinc-100 text-black/60'
                  }  shadow-md`}
                >{`${region.district}, ${region.ward}`}</button>
              ))
            ) : (
              <div className="w-full h-28">
                <CommonLoader />
              </div>
            )}
          </div>
          <div className="w-full grid place-items-center mt-5">
            <div className="w-40">
              <CustomButton
                style="fill-green"
                type="button"
                onClick={applyChange}
                disabled={!isAbleConfirm()}
              >
                Xác nhận thay đổi
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegionManagementDropdown;
