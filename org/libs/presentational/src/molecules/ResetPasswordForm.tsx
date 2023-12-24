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

function ResetPasswordForm() {
  const resolver = useYupValidationResolver(resetPasswordFormSchema);
  const router = useRouter();
  const { showError, showReactHookFormError, showSuccess } = useNotification();
  const { control, handleSubmit } = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
    resolver,
  });

  const onSuccessSubmit = ({ email }: { email: string }) => {
    router.push(OFFICER_PAGES.RESET_PASSWORD_OTP);
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
          disabled={false}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <CustomButton style="fill-primary" type="submit" loading={false}>
          Gửi mã xác thực
        </CustomButton>
        <CustomButton style="fill-secondary" type="button" loading={false}>
          Huỷ
        </CustomButton>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
