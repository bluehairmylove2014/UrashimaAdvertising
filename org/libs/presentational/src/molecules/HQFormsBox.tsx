'use client';

import { ISetting } from '@business-layer/services/entities';
import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import { useForm } from 'react-hook-form';
import YesNoPopup from './YesNoPopup';
import { useRef, useState } from 'react';
const formTypeSetting = {
  location: {
    boxTitle: (
      <>
        <i className="fi fi-sr-map-marker-home mr-2"></i>
        <span>Loại địa điểm</span>
      </>
    ),
    bgColor: 'bg-cyan-50',
  },
  ad: {
    boxTitle: (
      <>
        <i className="fi fi-sr-ad mr-2"></i>
        <span>Hình thức quảng cáo</span>
      </>
    ),
    bgColor: 'bg-cyan-50',
  },
  adBoard: {
    boxTitle: (
      <>
        <i className="fi fi-sr-lamp mr-2"></i>
        <span>Loại bảng quảng cáo</span>
      </>
    ),
    bgColor: 'bg-cyan-50',
  },
  report: {
    boxTitle: (
      <>
        <i className="fi fi-ss-triangle-warning mr-2"></i>
        <span>Hình thức báo cáo</span>
      </>
    ),
    bgColor: 'bg-cyan-50',
  },
};

type hqFormBoxProps = {
  formType: 'location' | 'ad' | 'adBoard' | 'report';
  data: ISetting[] | undefined;
};

function HQFormsBox({ formType, data }: hqFormBoxProps) {
  const { showReactHookFormError } = useNotification();
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);
  const [isMakingNew, setIsMakingNew] = useState<boolean>(false);
  const deleteTarget = useRef<number | null>(null);
  const { handleSubmit, register, reset } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  });
  //   const nameWatch = watch('name');

  const handleCreate = ({ name }: { name: string }) => {
    console.log(name);
    reset();
    setIsMakingNew(false);
  };

  const openPopupConfirmDelete = (id: number) => {
    deleteTarget.current = id;
    setIsPopupActive(true);
  };

  const handleDelete = (result: boolean) => {
    if (result) {
    }
    setIsPopupActive(false);
    deleteTarget.current = null;
  };

  return (
    <div
      className={`overflow-hidden rounded shadow-md p-6 ${formTypeSetting[formType].bgColor}`}
    >
      <h4 className="text-black mb-4">{formTypeSetting[formType].boxTitle}</h4>
      <div className="mb-3">
        {data ? (
          data.map((d) => (
            <div
              key={`${formType}@${d.id}`}
              className="mb-2 w-full rounded flex flex-row justify-between items-center bg-white pr-3 pl-4 py-2 shadow"
            >
              <p className="text-xs font-medium line-clamp-1">{d.name}</p>
              <button
                onClick={() => openPopupConfirmDelete(d.id)}
                className="text-white w-5 h-5 text-[0.5rem] rounded bg-rose-600 hover:bg-red-400 transition-colors"
              >
                <i className="fi fi-ss-trash"></i>
              </button>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <form
        onSubmit={handleSubmit(handleCreate, showReactHookFormError)}
        className={`${
          isMakingNew
            ? 'border border-solid border-zinc-300 rounded bg-white '
            : ''
        } w-full h-10 relative`}
      >
        {isMakingNew ? (
          <>
            <input
              type="text"
              {...register('name')}
              placeholder="+  Thêm mới"
              className="w-full h-full bg-transparent text-xs font-medium px-4 outline-none"
            />
            <div
              //   style={{ display: nameWatch.trim().length > 0 ? 'block' : 'none' }}
              className="absolute top-1/2 right-1 -translate-y-1/2 w-10"
            >
              <CustomButton style="fill-green" type="submit">
                <i className="fi fi-bs-check"></i>
              </CustomButton>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-row justify-end items-center">
              <div className="w-24">
                <CustomButton
                  style="fill-green"
                  type="button"
                  onClick={() => {
                    setIsMakingNew(true);
                  }}
                >
                  + Thêm mới
                </CustomButton>
              </div>
            </div>
          </>
        )}
      </form>
      <YesNoPopup
        isActive={isPopupActive}
        onResult={handleDelete}
        message={'Bạn chắc chắn muốn xoá chứ?'}
      />
    </div>
  );
}

export default HQFormsBox;
