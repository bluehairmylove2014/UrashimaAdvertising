'use client';
import './styles.scss';
import Image from 'next/image';
import logo from '@assets/logos/the_new_dawn.png';
import AuthInput, {
  authInputParams,
} from '@presentational/atoms/AuthInput/AuthInput';
import { useForm } from 'react-hook-form';
import { ValidateRegex } from '@utils/validators/config';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import { PAGE_URLS } from '@constants/pages';
import { useNotification } from '../Notification/Notification';
import { useLogin, useRegister } from '@modules/business-logic/lib/auth';
import { useRouter } from 'next/navigation';
import { authMethod } from '@/app/auth/page';
import { useState } from 'react';
import { isValidEmail, isValidPassword } from '@utils/validators';

const RegisterModel = ({
  onChangeMethod,
}: {
  onChangeMethod: (method: authMethod) => void;
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
    },
  });
  const [requirements, setRequirements] = useState<{
    [key: string]: { name: string; isMet: boolean };
  }>({
    EMAIL: {
      name: 'Email hợp lệ',
      isMet: false,
    },
    FULLNAME: {
      name: 'Tên hợp lệ',
      isMet: false,
    },
    PASSWORD_LENGTH: {
      name: 'Mật khẩu có ít nhất 6 ký tự',
      isMet: false,
    },
    PASSWORD_VALID: {
      name: 'Mật khẩu bao gồm 1 chữ cái in hoa',
      isMet: false,
    },
  });
  const inputs: authInputParams[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'EMAIL',
      control: control,
      placeHolders: 'example@gmail.com',
      onChange: (value: string) => {
        if (isValidEmail(value)) {
          const copyRequirement = { ...requirements };
          copyRequirement['EMAIL'].isMet = true;
          setRequirements(copyRequirement);
        } else if (requirements['EMAIL'].isMet) {
          const copyRequirement = { ...requirements };
          copyRequirement['EMAIL'].isMet = false;
          setRequirements(copyRequirement);
        }
      },
    },
    {
      name: 'fullName',
      label: 'Họ và tên',
      type: 'FULL_NAME',
      control: control,
      placeHolders: 'Nguyễn Văn A',
      onChange: (value: string) => {
        if (value.length > 0 && value.length < 125) {
          const copyRequirement = { ...requirements };
          copyRequirement['FULLNAME'].isMet = true;
          setRequirements(copyRequirement);
        } else if (requirements['FULLNAME'].isMet) {
          const copyRequirement = { ...requirements };
          copyRequirement['FULLNAME'].isMet = false;
          setRequirements(copyRequirement);
        }
      },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'PASSWORD',
      control: control,
      placeHolders: 'TheNewDawnVN123',
      onChange: (value: string) => {
        if (value.length >= 6) {
          const copyRequirement = { ...requirements };
          copyRequirement['PASSWORD_LENGTH'].isMet = true;
          setRequirements(copyRequirement);
        } else if (requirements['PASSWORD_LENGTH'].isMet) {
          const copyRequirement = { ...requirements };
          copyRequirement['PASSWORD_LENGTH'].isMet = false;
          setRequirements(copyRequirement);
        }

        if (isValidPassword(value)) {
          const copyRequirement = { ...requirements };
          copyRequirement['PASSWORD_VALID'].isMet = true;
          setRequirements(copyRequirement);
        } else if (requirements['PASSWORD_VALID'].isMet) {
          const copyRequirement = { ...requirements };
          copyRequirement['PASSWORD_VALID'].isMet = false;
          setRequirements(copyRequirement);
        }
      },
    },
  ];
  const { onRegister, isLoading } = useRegister();
  const { showError } = useNotification();
  const router = useRouter();

  // Methods
  const handleSuccessSubmit = ({
    email,
    fullName,
    password,
  }: {
    email: string;
    fullName: string;
    password: string;
  }) => {
    onRegister({ email, fullName, password })
      .then((msg) => {
        router.push(PAGE_URLS.HOME);
      })
      .catch((error) => {
        showError(error.message);
      });
  };
  const handleErrorSubmit = (errors: any) => {
    if (errors) {
      showError(errors[Object.keys(errors)[0]].message);
    }
  };

  return (
    <form
      className="register-model"
      onSubmit={handleSubmit(handleSuccessSubmit, handleErrorSubmit)}
      noValidate
    >
      <div className="register-model__logo">
        <Image src={logo} alt="the new dawn" fill />
      </div>

      {inputs.map((inp, index) => (
        <div
          className={`register-model__row ${
            index + 1 !== inputs.length ? 'end-space' : ''
          }`}
          key={inp.name}
        >
          <AuthInput
            name={inp.name}
            label={inp.label}
            control={inp.control}
            placeHolders={inp.placeHolders}
            type={inp.type}
            onChange={inp.onChange}
          />
        </div>
      ))}

      <div className="register-model__requirement">
        {Object.keys(requirements).map((key) => (
          <div
            className={`requirement ${requirements[key].isMet ? 'active' : ''}`}
            key={requirements[key].name}
          >
            <i className="fi fi-br-cross-small not-met"></i>
            <i className="fi fi-bs-check met"></i>
            {requirements[key].name}
          </div>
        ))}
      </div>

      <div className="register-model__button">
        <CommonButton style="soft-fill" type={'submit'} loading={isLoading}>
          Đăng ký
        </CommonButton>
      </div>
      <div className="register-model__row center">
        <CommonButton
          style="none"
          onClick={() => onChangeMethod && onChangeMethod('login')}
        >
          Đã có tài khoản? Đến đăng nhập
        </CommonButton>
      </div>
    </form>
  );
};

export default RegisterModel;
