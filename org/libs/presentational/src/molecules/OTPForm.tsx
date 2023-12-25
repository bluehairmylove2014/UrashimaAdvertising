'use client';

import AuthInput from '@presentational/atoms/AuthInput';
import {
  passwordOtpFormSchema,
  resetPasswordFormSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import { useForm } from 'react-hook-form';
import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import { useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';
import OTPInput from '@presentational/atoms/OTPInput';

const DEFAULT_OTP_LENGTH = 6;

function OTPForm() {
  const resolver = useYupValidationResolver(passwordOtpFormSchema);
  const router = useRouter();
  const { showError, showReactHookFormError, showSuccess } = useNotification();
  const { setValue, handleSubmit } = useForm<{ otp: string }>({
    defaultValues: {
      otp: '',
    },
    resolver,
  });

  const onSuccessSubmit = ({ otp }: { otp: string }) => {
    router.push(OFFICER_PAGES.RESET_PASSWORD_NEW);
  };

  return (
    <form
      onSubmit={handleSubmit(onSuccessSubmit, showReactHookFormError)}
      className="pt-4 px-5 max-w-full overflow-hidden flex flex-col items-center"
    >
      <div className="my-6 w-3/4 h-fit">
        <OTPInput
          onChange={(otp) => setValue('otp', otp.join(''))}
          disabled={false}
          otpLength={DEFAULT_OTP_LENGTH}
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <CustomButton style="fill-primary" type="submit" loading={false}>
          Xác thực
        </CustomButton>
        <CustomButton style="fill-secondary" type="button" loading={false}>
          Huỷ
        </CustomButton>
      </div>
    </form>
  );
}

export default OTPForm;
