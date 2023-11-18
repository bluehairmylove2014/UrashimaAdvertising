import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { Toaster, toast } from 'sonner';

export type notificationContentType = string;

const Notification = (): JSX.Element => {
  return <Toaster expand={false} richColors closeButton position="top-right" />;
};

type useNotificationType = {
  showSuccess: (content: notificationContentType) => void;
  showError: (content: notificationContentType) => void;
  showReactHookFormError: (rhfError: FieldErrors<any>) => void;
};
export const useNotification = (): useNotificationType => {
  const showSuccess = (content: notificationContentType) => {
    toast.success(content);
  };
  const showError = (content: notificationContentType) => {
    toast.error(content);
  };
  // const showReactHookFormError = (rhfError: {
  //   [key: string]: {
  //     message: string;
  //   };
  // }) => {
  //   toast.error(rhfError[Object.keys(rhfError)[0]].message);
  // };
  const showReactHookFormError = (rhfError: FieldErrors<any>) => {
    // toast.error(rhfError[Object.keys(rhfError)[0]].message);
    console.log(rhfError);
  };
  return {
    showSuccess,
    showError,
    showReactHookFormError,
  };
};

export default Notification;
