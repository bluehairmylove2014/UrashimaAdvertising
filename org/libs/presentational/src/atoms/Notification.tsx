import { Toaster, toast } from 'sonner';

export type notificationContentType = string;

const Notification = (): JSX.Element => {
  return <Toaster expand={false} richColors closeButton position="top-right" />;
};

type useNotificationType = {
  showSuccess: (content: notificationContentType) => void;
  showError: (content: notificationContentType) => void;
  showReactHookFormError: (rhfError: Record<string, any>) => void;
};
export const useNotification = (): useNotificationType => {
  const showSuccess = (content: notificationContentType) => {
    console.log('SHOW SUCCESS');
    toast.success(content);
  };
  const showError = (content: notificationContentType) => {
    console.log('SHOW ERROR: ', content);
    toast.error(content);
  };
  const showReactHookFormError = (rhfError: Record<string, any>) => {
    console.log('SHOW ERROR: ', rhfError[Object.keys(rhfError)[0]].message);
    toast.error(rhfError[Object.keys(rhfError)[0]].message);
  };
  return {
    showSuccess,
    showError,
    showReactHookFormError,
  };
};

export default Notification;
