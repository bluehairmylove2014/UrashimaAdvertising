'use client';

import { IAccountDetail } from '@business-layer/services/entities';
import { useNotification } from '@presentational/atoms/Notification';
import { useForm } from 'react-hook-form';
import RoleIcon, { roleIconType } from '@presentational/atoms/RoleIcon';

type personalDetailFormType = {
  email: string;
  fullName: string;
  dateOfBirth: string;
  phone: string;
};

function OfficerPersonalDetail({ data }: { data: IAccountDetail | null }) {
  const { showSuccess, showError, showReactHookFormError } = useNotification();
  const formDefaultValue = {
    email: data?.email ?? '',
    fullName: data?.fullName ?? '',
    dateOfBirth: data?.dateOfBirth.substring(0, 10) ?? '',
    phone: data?.phone ?? '',
  };
  const { register, handleSubmit } = useForm<personalDetailFormType>({
    defaultValues: formDefaultValue,
  });

  const onSuccessSubmit = (data: personalDetailFormType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSuccessSubmit, showReactHookFormError)}
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
              className="w-3/4 p-2 border rounded text-xs"
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
              className="w-3/4 p-2 border rounded text-xs"
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
              className="w-3/4 p-2 border rounded text-xs"
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
              className="w-3/4 p-2 border rounded text-xs"
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
    </form>
  );
}

export default OfficerPersonalDetail;
