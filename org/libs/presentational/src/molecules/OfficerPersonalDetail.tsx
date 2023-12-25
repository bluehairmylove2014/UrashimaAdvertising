'use client';

import { IAccountDetail } from '@business-layer/services/entities';
import { useNotification } from '@presentational/atoms/Notification';
import { useForm } from 'react-hook-form';
import RoleIcon, { roleIconType } from '@presentational/atoms/RoleIcon';
import { useState } from 'react';
import CustomButton from '@presentational/atoms/CustomButton';
import { accountInfoToModifyType } from '@business-layer/services';
import { useModifyAccountInfo } from './../../../business-layer/src/business-logic/lib/account';
import {
  accountModifyFormSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';

function OfficerPersonalDetail({ data }: { data: IAccountDetail | null }) {
  const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);
  const { showSuccess, showError, showReactHookFormError } = useNotification();
  const formDefaultValue = {
    email: data?.email ?? '',
    fullName: data?.fullName ?? '',
    dateOfBirth: data?.dateOfBirth.substring(0, 10) ?? '',
    phone: data?.phone ?? '',
  };
  const resolver = useYupValidationResolver(accountModifyFormSchema);
  const { register, handleSubmit, reset } = useForm<accountInfoToModifyType>({
    defaultValues: formDefaultValue,
    resolver,
  });
  const { onModifyAccountInfo, isLoading } = useModifyAccountInfo();

  // methods
  const handleEditProfile = (data: accountInfoToModifyType) => {
    onModifyAccountInfo(data)
      .then((msg) => {
        showSuccess(msg);
        setIsEnableEdit(false);
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditProfile, showReactHookFormError)}
      className="mt-4 space-y-4"
    >
      {data ? (
        <>
          <div className="flex items-center space-x-2">
            <label htmlFor="email" className="w-1/4 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              disabled={!isEnableEdit}
              className="disabled:cursor-not-allowed disabled:bg-zinc-50 w-3/4 p-2 border rounded text-xs"
              {...register('email')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="fullName" className="w-1/4 text-sm">
              Họ và Tên
            </label>
            <input
              id="fullName"
              type="text"
              disabled={!isEnableEdit}
              className="disabled:cursor-not-allowed disabled:bg-zinc-50 w-3/4 p-2 border rounded text-xs"
              {...register('fullName')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="dob" className="w-1/4 text-sm">
              Ngày sinh
            </label>
            <input
              id="dob"
              type="date"
              disabled={!isEnableEdit}
              className="disabled:cursor-not-allowed disabled:bg-zinc-50 w-3/4 p-2 border rounded text-xs"
              {...register('dateOfBirth')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="phone" className="w-1/4 text-sm">
              Số điện thoại
            </label>
            <input
              id="phone"
              type="text"
              disabled={!isEnableEdit}
              className="disabled:cursor-not-allowed disabled:bg-zinc-50 w-3/4 p-2 border rounded text-xs"
              {...register('phone')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="role" className="w-1/4 text-sm">
              Vai trò
            </label>

            <RoleIcon role={data.role as roleIconType} />
          </div>
          <div className="flex items-center space-x-2">
            <p className="w-1/4 text-sm">Đơn vị quản lý:</p>
            <p className="text-sm">{data.unitUnderManagement}</p>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="w-full h-fit grid place-items-center mt-12">
        {isEnableEdit ? (
          <div className="flex flex-row gap-3">
            <div className="w-28 h-10">
              <CustomButton
                style="fill-secondary"
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setIsEnableEdit(false);
                  reset();
                }}
              >
                Huỷ thay đổi
              </CustomButton>
            </div>
            <div className="w-36 h-10">
              <CustomButton
                style="fill-green"
                type="submit"
                loading={isLoading}
              >
                Xác nhận chỉnh sửa
              </CustomButton>
            </div>
          </div>
        ) : (
          <div className="w-36 h-10">
            <CustomButton
              style="fill-primary"
              type="button"
              onClick={() => setIsEnableEdit(true)}
            >
              Chỉnh sửa thông tin
            </CustomButton>
          </div>
        )}
      </div>
    </form>
  );
}

export default OfficerPersonalDetail;
