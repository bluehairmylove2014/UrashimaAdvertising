'use client';

import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import {
  changePasswordSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import { useForm } from 'react-hook-form';

function ChangePasswordPage() {
  const resolver = useYupValidationResolver(changePasswordSchema);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    resolver,
  });
  const { showReactHookFormError } = useNotification();

  const handleChangePassword = ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    reset();
  };

  return (
    <div className="w-3/4 p-4">
      <h2 className="font-bold mb-4">Đổi mật khẩu</h2>
      <p>
        Nhập mật khẩu cũ và mật khẩu mới phù hợp, độ dài trên 6 ký tự. Hãy nhớ
        mật khẩu vì quá trình quên mật khẩu rất phiền phức, xin cảm ơn
      </p>

      <form
        onSubmit={handleSubmit(handleChangePassword, showReactHookFormError)}
        className="mt-4 space-y-4"
      >
        <div className="flex items-center space-x-2">
          <label htmlFor="oldPassword" className="w-1/4 text-sm">
            Mật khẩu cũ
          </label>
          <input
            id="oldPassword"
            type="text"
            // disabled={!isEnableEdit}
            placeholder="Tối thiểu 6 ký tự"
            className="disabled:cursor-not-allowed disabled:bg-zinc-50 w-3/4 p-2 border rounded text-xs"
            {...register('oldPassword')}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="newPassword" className="w-1/4 text-sm">
            Mật khẩu mới
          </label>
          <input
            id="newPassword"
            type="text"
            // disabled={!isEnableEdit}
            placeholder="Tối thiểu 6 ký tự"
            className="disabled:cursor-not-allowed disabled:bg-zinc-50 w-3/4 p-2 border rounded text-xs"
            {...register('newPassword')}
          />
        </div>
        <div className="w-full h-fit grid place-items-center">
          <div className="w-36 h-10">
            <CustomButton style="fill-green" type="submit">
              Xác nhận thay đổi
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
