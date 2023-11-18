'use client';

import { useForm, Controller, FieldErrors } from 'react-hook-form';
import React from 'react';
import { useNotification } from '../atoms/Notification';

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
    <form onSubmit={handleSubmit(handleLogin, handleFormSubmitError)}>
      <div>
        <p>Welcome to</p>
        <h3>UrashimaAds Hub</h3>
      </div>
    </form>
  );
}

export default LoginForm;
