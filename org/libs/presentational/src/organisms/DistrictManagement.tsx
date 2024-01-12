'use client';

import {
  useAddRegions,
  useFetchRegions,
  useRemoveRegion,
} from '@business-layer/business-logic/lib/regionManagement';
import { regionResponseType } from '@business-layer/services';
import CommonLoader from '@presentational/atoms/CommonLoader';
import CustomButton from '@presentational/atoms/CustomButton';
import { mulSelectOptionType } from '@presentational/atoms/MultipleLayerSelect';
import { useNotification } from '@presentational/atoms/Notification';
import YesNoPopup from '@presentational/molecules/YesNoPopup';
import { toggleClass } from '@utils/helpers';
import {
  newRegionSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

function DistrictManagement() {
  const resolver = useYupValidationResolver(newRegionSchema);
  const { data: regionsData, refetch } = useFetchRegions();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      ward: '',
      district: '',
    },
    resolver,
  });
  const { showReactHookFormError, showError, showSuccess } = useNotification();
  const formBoxRefs = useRef<Array<React.RefObject<HTMLDivElement> | null>>([]);
  const [districts, setDistricts] = useState<mulSelectOptionType | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [isActivePopUpAddDistrict, setIsActivePopUpAddDistrict] =
    useState<boolean>(false);

  const [isShowingPopupDeleteDistrict, setIsShowingPopupDeleteDistrict] =
    useState<boolean>(false);
  const [isShowingPopupDeleteWard, setIsShowingPopupDeleteWard] =
    useState<boolean>(false);
  const { onAddRegions } = useAddRegions();
  const { onRemoveRegion } = useRemoveRegion();

  const needDeletedDistrict = useRef<string | null>(null);
  const needDeletedWard = useRef<string | null>(null);

  const onSelectDistrict = (type: string, index: number) => {
    setSelectedDistrict(type);
    handleToggleFormBox(index);
  };

  const showDeleteDistrictPopup = (district: string) => {
    needDeletedDistrict.current = district;
    setIsShowingPopupDeleteDistrict(true);
  };

  const showDeleteWardPopup = (ward: string) => {
    needDeletedWard.current = ward;
    setIsShowingPopupDeleteWard(true);
  };

  // Delete District
  const handleDeleteDistrict = (result: boolean) => {
    if (result && needDeletedDistrict.current && regionsData) {
      let promises: Promise<string>[] = [];
      regionsData.forEach((r) => {
        if (r.district === needDeletedDistrict.current) {
          promises.push(onRemoveRegion(r.id));
        }
      });
      Promise.all(promises)
        .then((msg) => {
          showSuccess("Xoá quận thành công");
        })
        .catch((error) => {
          showError(error.message);
        })
        .finally(() => {
          refetch();
        });
    }

    needDeletedDistrict.current = null;
    setIsShowingPopupDeleteDistrict(false);
  };

  // Delete Ward
  const handleDeleteWard = (result: boolean) => {
    if (result && needDeletedWard.current) {
      const targetId =
        regionsData?.find((r) => r.ward === needDeletedWard.current)?.id ??
        null;
      if (targetId) {
        onRemoveRegion(targetId)
          .then((msg) => {
            showSuccess(msg);
          })
          .catch((error) => {
            showError(error.message);
          })
          .finally(() => {
            refetch();
          });
      } else {
        console.error('LOOIX');
      }
    }

    needDeletedWard.current = null;
    setIsShowingPopupDeleteWard(false);
  };

  // Add District
  const handleAddDistrict = (data: { ward: string; district: string }) => {
    onAddRegions(data)
      .then((msg) => {
        showSuccess(msg);
        refetch();
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        setIsActivePopUpAddDistrict(false);
        reset();
      });
  };

  // Add Ward
  const handleAddWard = () => { };

  useEffect(() => {
    if (regionsData) {
      const districts: mulSelectOptionType = {};
      regionsData.forEach((r) => {
        const sameKey = Object.keys(districts).find((dk) => dk === r.district);
        if (sameKey) {
          districts[sameKey].push(r.ward);
        } else {
          districts[r.district] = [r.ward];
        }
      });

      setDistricts(districts);

      if (districts) {
        formBoxRefs.current = []; // Clear existing refs
        Object.keys(districts).forEach(() => {
          formBoxRefs.current.push(React.createRef<HTMLDivElement>());
        });
      }
      console.log(districts);
    }
  }, [regionsData]);

  const handleToggleFormBox = (index: number) => {
    const formBoxRef = formBoxRefs.current[index];

    if (formBoxRef && formBoxRef.current) {
      toggleClass(formBoxRef.current, 'activeHQFormBox');
    }
  };

  useEffect(() => {
    const handleClickOutsideButton = (event: MouseEvent) => {
      const button = event.target as HTMLElement;

      // Check if the clicked element is not the button or the toggle
      if (
        !button.closest('.my-button-district-class') &&
        !button.closest('.my-toggle-class')
      ) {
        setSelectedDistrict(null);
      }
    };

    // Add event listener on mount
    document.addEventListener('click', handleClickOutsideButton);

    // Remove event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutsideButton);
    };
  }, []);

  return (
    <div className="w-[65%]">
      {districts ? (
        <>
          <div className="flex items-end justify-end mb-4">
            <button
              type="button"
              className="px-4 py-2 rounded text-xs font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
              onClick={() => setIsActivePopUpAddDistrict(true)}
            >
              <i className="fi fi-sr-square-plus mr-2"></i>
              Thêm mới khu vực quản lý
            </button>
          </div>
          {/* Handle District Management */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {Object.keys(districts).map((r, index) => (
              <div className="flex" key={index}>
                <div className="flex items-center justify-center">
                  {/* Button delete district */}
                  <button
                    onClick={() => {
                      showDeleteDistrictPopup(r);
                    }}
                    className=" text-white text-[0.5rem] mr-1 rounded bg-rose-600 relative hover:bg-red-400 transition-colors w-5 h-5 max-w-[1.25rem] flex-grow "
                  >
                    <i className="fi fi-ss-trash"></i>
                  </button>
                </div>

                <button
                  className={`text-[0.65rem] ${selectedDistrict === r
                    ? 'bg-rose-500  text-white'
                    : 'bg-rose-100 text-black hover:bg-rose-500 hover:text-white'
                    } transition-colors rounded-lg  font-semibold text-start  whitespace-nowrap px-2 py-2 w-full disabled:cursor-not-allowed my-button-district-class`}
                  type="button"
                  onClick={() => {
                    onSelectDistrict(r, index);
                  }}
                >
                  {r}
                </button>
              </div>
            ))}
          </div>
          {/* Handle Ward Management */}
          {Object.keys(districts).map((district, indexDis) => (
            <div
              className={`my-toggle-class bg-rose-100 overflow-auto rounded shadow-[-10px_0px_25px_-15px_rgba(0,0,0,0.1)] p-6 fixed top-0 right-0 w-0 opacity-0 pointer-events-none invisible transition-all z-30 h-screen`}
              ref={formBoxRefs.current[indexDis]}
              key={indexDis}
            >
              <h4 className="text-black mb-4 text-center">Danh sách phường</h4>
              <div className="mb-3">
                {selectedDistrict ? (
                  districts[selectedDistrict] ? (
                    districts[selectedDistrict].map((d, index) => (
                      <div
                        key={`${index}`}
                        className="mb-2 w-full rounded flex flex-row justify-between items-center gap-4 bg-white pr-3 pl-4 py-2 shadow"
                      >
                        <p className="text-xs font-medium line-clamp-1 flex-shrink max-w-[80%]">
                          {d}
                        </p>
                        {/* Button delete ward */}
                        <button
                          onClick={() => {
                            showDeleteWardPopup(d);
                          }}
                          className="text-white text-[0.5rem] rounded bg-rose-600 hover:bg-red-400 transition-colors w-5 h-5 max-w-[1.25rem] flex-grow"
                        >
                          <i className="fi fi-ss-trash"></i>
                        </button>
                      </div>
                    ))
                  ) : (
                    <></>
                  )
                ) : (
                  <CommonLoader />
                )}
              </div>

              <YesNoPopup
                isActive={isShowingPopupDeleteWard}
                onResult={handleDeleteWard}
                message={'Bạn chắc chắn muốn xoá phường này chứ?'}
              />
            </div>
          ))}
        </>
      ) : (
        <></>
      )}

      {isActivePopUpAddDistrict ? (
        <div className="w-full h-screen mx-[-2rem] fixed top-0 bg-black/60 z-50">
          <div className="flex items-start mt-[10rem] justify-center h-screen">
            <div className="50% mr-[14rem]">
              <form
                className="bg-white rounded p-5"
                onSubmit={handleSubmit(
                  handleAddDistrict,
                  showReactHookFormError
                )}
              >
                <div className="flex justify-between items-start">
                  <div></div>
                  <h2 className="text-center mb-3">THÊM MỚI QUẬN</h2>
                  <button
                    type="button"
                    className="text-sm"
                    onClick={() => setIsActivePopUpAddDistrict(false)}
                  >
                    X
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Nhập quận bạn muốn thêm"
                  {...register('district')}
                  className="w-[100%] h-full text-xs font-medium px-4 outline-none border border-solid border-zinc-300 rounded bg-white py-3"
                />

                <input
                  type="text"
                  placeholder="Nhập phường bạn muốn thêm cho quận đó"
                  {...register('ward')}
                  className="w-[100%] h-full text-xs font-medium px-4 outline-none border border-solid border-zinc-300 rounded bg-white mt-2 py-3 mb-4"
                />
                <CustomButton type="submit" style="fill-green">
                  XÁC NHẬN THÊM
                </CustomButton>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <YesNoPopup
        isActive={isShowingPopupDeleteDistrict}
        onResult={handleDeleteDistrict}
        message={'Bạn chắc chắn muốn xoá quận này chứ?'}
      />
    </div>
  );
}

export default DistrictManagement;
