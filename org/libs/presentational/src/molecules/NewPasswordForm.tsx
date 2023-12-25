'use client';

import AuthInput from '@presentational/atoms/AuthInput';
import {
  newPasswordFormSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import { useForm } from 'react-hook-form';
import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import { useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';
import { useResetPassword } from '@business-layer/business-logic/lib/auth';

function NewPasswordForm() {
  const resolver = useYupValidationResolver(newPasswordFormSchema);
  const router = useRouter();
  const { showError, showReactHookFormError, showSuccess } = useNotification();
  const { control, handleSubmit } = useForm<{
    password: string;
    commitPassword: string;
  }>({
    defaultValues: {
      password: '',
      commitPassword: '',
    },
    resolver,
  });
  const { onResetPassword, isLoading } = useResetPassword();

  const onSuccessSubmit = ({
    password,
    commitPassword,
  }: {
    password: string;
    commitPassword: string;
  }) => {
    if (password !== commitPassword) {
      showError('Hai mật khẩu không giống nhau!');
      return;
    }
    onResetPassword({ email: '', password })
      .then((msg) => {
        showSuccess(msg);
        router.push(OFFICER_PAGES.AUTH);
      })
      .catch((error) => showError(error.message));
  };

  return (
    <form
      onSubmit={handleSubmit(onSuccessSubmit, showReactHookFormError)}
      className="pt-4 px-5 max-w-full overflow-hidden"
    >
      <div className="mb-4 w-full h-fit flex flex-col gap-3">
        <AuthInput
          name="password"
          label="Mật khẩu mới"
          type="PASSWORD"
          control={control}
          disabled={isLoading}
        />
        <AuthInput
          name="commitPassword"
          label="Nhập lại mật khẩu mới"
          type="PASSWORD"
          control={control}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <CustomButton style="fill-primary" type="submit" loading={isLoading}>
          Xác nhận đổi
        </CustomButton>
        <CustomButton style="fill-secondary" type="button" disabled={isLoading} onClick={() => router.push(OFFICER_PAGES.AUTH)}>
          Huỷ
        </CustomButton>
      </div>
    </form>
  );
}

export default NewPasswordForm;
