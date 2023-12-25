'use client';

import AuthInput from '@presentational/atoms/AuthInput';
import {
  resetPasswordFormSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import { useForm } from 'react-hook-form';
import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import { useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';
import { useForgotPassword } from '@business-layer/business-logic/lib/auth';

function ResetPasswordForm() {
  const resolver = useYupValidationResolver(resetPasswordFormSchema);
  const router = useRouter();
  const { showError, showReactHookFormError, showSuccess } = useNotification();
  const { onForgotPassword, isLoading } = useForgotPassword();
  const { control, handleSubmit } = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
    resolver,
  });

  const onSuccessSubmit = ({ email }: { email: string }) => {
    onForgotPassword({ email })
      .then((msg) => {
        showSuccess(msg);
        router.push(OFFICER_PAGES.RESET_PASSWORD_OTP);
      })
      .catch((error) => showError(error.message));
  };

  return (
    <form
      onSubmit={handleSubmit(onSuccessSubmit, showReactHookFormError)}
      className="pt-4 px-5 max-w-full overflow-hidden"
    >
      <div className="mb-4 w-full h-fit">
        <AuthInput
          name="email"
          label="Email"
          type="EMAIL"
          control={control}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <CustomButton style="fill-primary" type="submit" loading={isLoading}>
          Gửi mã xác thực
        </CustomButton>
        <CustomButton
          style="fill-secondary"
          type="button"
          disabled={isLoading}
          onClick={() => router.push(OFFICER_PAGES.AUTH)}
        >
          Huỷ
        </CustomButton>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
