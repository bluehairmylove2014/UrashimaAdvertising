'use client';

import { useForm } from 'react-hook-form';
import {
  useLogin,
  useGoogleLogin,
  useFacebookLogin,
  useGithubLogin,
} from '@business-layer/business-logic/lib/auth';
import { useNotification } from '@presentational/atoms/Notification';
import CustomButton from '@presentational/atoms/CustomButton';
import AuthInput, { authInputParams } from '@presentational/atoms/AuthInput';
import { loginSchema, useYupValidationResolver } from '@utils/validators/yup';
import Link from 'next/link';
import { OFFICER_PAGES } from '../../../constants/officerPages';
import IconButton from '@presentational/atoms/IconButton';
import FBIcon from '@presentational/assets/facebook.png';
import GGIcon from '@presentational/assets/google.png';
import GITIcon from '@presentational/assets/github.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const iconButtonSize = 2;
const authInputList: authInputParams[] = [
  {
    name: 'email',
    label: 'Email address',
    type: 'EMAIL',
    control: null,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'PASSWORD',
    control: null,
  },
];

type loginFormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const resolver = useYupValidationResolver(loginSchema);
  const { showSuccess, showError, showReactHookFormError } = useNotification();
  const { onLogin, isLoading: isLoginLoading } = useLogin();
  const { onGoogleLogin } = useGoogleLogin();
  const { onFacebookLogin } = useFacebookLogin();
  const { onGithubLogin } = useGithubLogin();
  const { control, handleSubmit } = useForm<loginFormData>({
    defaultValues: Object.fromEntries(
      authInputList.map(({ name }) => [name, ''])
    ),
    resolver,
  });
  const router = useRouter();

  const handleLogin = ({ email, password }: loginFormData) => {
    onLogin({ email, password })
      .then((msg) => {
        showSuccess(msg);
        router.push(OFFICER_PAGES.DASHBOARD);
      })
      .catch((error) => showError(error.message));
  };

  return (
    <form
      className="py-8 px-5 max-w-full overflow-hidden"
      onSubmit={handleSubmit(handleLogin, showReactHookFormError)}
      noValidate
    >
      <div className="leading-4 mb-8">
        <p className="text-center font-extrabold">Welcome to</p>
        <h4 className="text-center font-extrabold">URASHIMA ADVERTISING</h4>
      </div>
      <div className="mb-3 w-full h-fit grid grid-rows-2 gap-4">
        {authInputList.map(({ name, label, type }) => (
          <div key={name}>
            <AuthInput
              name={name}
              label={label}
              type={type}
              control={control}
              disabled={isLoginLoading}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-end items-center mb-4">
        <Link
          href={OFFICER_PAGES.DASHBOARD}
          className="font-semibold text-xs text-gray-400 hover:text-blue-600"
        >
          Forgot Password?
        </Link>
      </div>
      <CustomButton style="fill-primary" type="submit" loading={isLoginLoading}>
        Sign in
      </CustomButton>
      <p className=" font-medium text-xs text-gray-500 flex justify-center items-center my-4">
        Or you can sign in with
      </p>
      <div className="flex flex-row justify-center items-center gap-4">
        <IconButton
          type="button"
          shape="circle"
          callback={onGoogleLogin}
          customSize={`${iconButtonSize}rem`}
        >
          <Image
            src={GGIcon}
            alt="google login"
            fill
            sizes={`${iconButtonSize}rem`}
          />
        </IconButton>
        <IconButton
          type="button"
          shape="circle"
          callback={onFacebookLogin}
          customSize={`${iconButtonSize}rem`}
        >
          <Image
            src={FBIcon}
            alt="facebook login"
            fill
            sizes={`${iconButtonSize}rem`}
          />
        </IconButton>
        <IconButton
          type="button"
          shape="circle"
          callback={onGithubLogin}
          customSize={`${iconButtonSize}rem`}
        >
          <Image
            src={GITIcon}
            alt="github login"
            fill
            sizes={`${iconButtonSize}rem`}
          />
        </IconButton>
      </div>
    </form>
  );
}

export default LoginForm;
