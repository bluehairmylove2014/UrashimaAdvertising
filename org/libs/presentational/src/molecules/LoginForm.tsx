'use client';

import { useForm, Controller, FieldErrors } from 'react-hook-form';
import React from 'react';
import { useNotification } from '../atoms/Notification';
import CustomButton from './../atoms/CustomButton';

type loginFormData = {
  email: string;
  password: string;
};
function LoginForm() {
  const { showSuccess, showError, showReactHookFormError } = useNotification();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = ({ email, password }: loginFormData) => {
    console.log({ email, password });
  };
  const handleFormSubmitError = (error: FieldErrors<any>) => {
    showReactHookFormError(error);
  };

  return (
    <form
      className="py-3 px-5 max-w-full overflow-hidden"
      onSubmit={handleSubmit(handleLogin, handleFormSubmitError)}
    >
      <div className="leading-4 mb-2">
        <p className="text-center font-extrabold">Welcome to</p>
        <h4 className="text-center font-extrabold">URASHIMA ADVERTISING</h4>
      </div>
      <CustomButton style="fill-primary">SIGN IN</CustomButton>
    </form>
  );
}

export default LoginForm;
