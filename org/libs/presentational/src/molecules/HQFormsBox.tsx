'use client';

import { ISetting } from '@business-layer/services/entities';
import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import { useForm } from 'react-hook-form';
import YesNoPopup from './YesNoPopup';
import { forwardRef, useEffect, useRef, useState } from 'react';
import CommonLoader from '@presentational/atoms/CommonLoader';

export type hqFormBoxProps = {
  contextData: ISetting[] | null;
  getter: (() => Promise<ISetting[]>) | null;
  setter: ((setting: ISetting[]) => Promise<string>) | null;
  isGetting?: boolean;
  isModifying?: boolean;
};

const HQFormsBox = forwardRef(
  (
    { contextData, getter, setter, isGetting, isModifying }: hqFormBoxProps,
    ref: any
  ) => {
    const { showReactHookFormError } = useNotification();
    const [isPopupActive, setIsPopupActive] = useState<boolean>(false);
    const deleteTargetId = useRef<number | null>(null);
    const { showError, showSuccess } = useNotification();
    const { handleSubmit, register, reset } = useForm<{ name: string }>({
      defaultValues: {
        name: '',
      },
    });

    const handleCreate = ({ name }: { name: string }) => {
      if (contextData) {
        if (contextData.some((c) => c.name === name)) {
          showError('Tên đối tượng đã có sẵn rồi!');
        } else {
          setter &&
            setter([
              ...contextData,
              { id: contextData[contextData.length - 1].id + 1, name },
            ])
              .then((msg) => showSuccess(msg))
              .catch((error) => showError(error.message));
          reset();
        }
      }
    };

    const openPopupConfirmDelete = (id: number) => {
      deleteTargetId.current = id;
      setIsPopupActive(true);
    };

    const handleDelete = (result: boolean) => {
      if (result) {
        contextData &&
          deleteTargetId &&
          setter &&
          setter(contextData.filter((d) => d.id !== deleteTargetId.current))
            .then((msg) => showSuccess(msg))
            .catch((error) => showError(error.message));
      }
      setIsPopupActive(false);
      deleteTargetId.current = null;
    };

    useEffect(() => {
      console.log(contextData);
    }, [contextData]);

    return (
      <div
        className={`bg-rose-100 overflow-auto rounded shadow-[-10px_0px_25px_-15px_rgba(0,0,0,0.1)] p-6 fixed top-0 right-0 w-0 opacity-0 pointer-events-none invisible transition-all z-30 h-screen`}
        ref={ref}
      >
        <h4 className="text-black mb-4 text-center">Tuỳ chỉnh</h4>
        <div className="mb-3">
          {Array.isArray(contextData) ? (
            contextData.map((d) => (
              <div
                key={`${d.id}`}
                className="mb-2 w-full rounded flex flex-row justify-between items-center gap-4 bg-white pr-3 pl-4 py-2 shadow"
              >
                <p className="text-xs font-medium line-clamp-1 flex-shrink max-w-[80%]">
                  {d.name}
                </p>
                <button
                  onClick={() => openPopupConfirmDelete(d.id)}
                  className="text-white text-[0.5rem] rounded bg-rose-600 hover:bg-red-400 transition-colors w-5 h-5 max-w-[1.25rem] flex-grow"
                >
                  <i className="fi fi-ss-trash"></i>
                </button>
              </div>
            ))
          ) : (
            <CommonLoader />
          )}
        </div>
        <form
          onSubmit={handleSubmit(handleCreate, showReactHookFormError)}
          className={`border border-solid border-zinc-300 rounded bg-white w-full h-10 relative`}
        >
          <input
            type="text"
            {...register('name')}
            placeholder="+  Thêm mới"
            disabled={isModifying}
            className="w-full h-full bg-transparent text-xs font-medium px-4 outline-none"
          />
          <div className="absolute top-1/2 right-1 -translate-y-1/2 w-10">
            <CustomButton
              style="fill-green"
              type="submit"
              loading={isModifying}
              isShortLoading={true}
            >
              <i className="fi fi-bs-check"></i>
            </CustomButton>
          </div>
        </form>

        <YesNoPopup
          isActive={isPopupActive}
          onResult={handleDelete}
          message={'Bạn chắc chắn muốn xoá chứ?'}
        />
      </div>
    );
  }
);

export default HQFormsBox;
