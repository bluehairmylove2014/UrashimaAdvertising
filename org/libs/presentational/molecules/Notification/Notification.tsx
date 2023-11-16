import "./styles.scss";
import { Toaster, toast } from "sonner";

export type notificationContentType = string;

const Notification = () => {
  return (
    <>
      <Toaster expand={false} richColors closeButton position="top-right" />
    </>
  );
};

type useNotificationType = {
  showSuccess: (content: notificationContentType) => void;
  showError: (content: notificationContentType) => void;
  showReactHookFormError: (rhfError: {
    [key: string]: {
      message: string;
    };
  }) => void;
};
export const useNotification = (): useNotificationType => {
  const showSuccess = (content: notificationContentType) => {
    toast.success(content);
  };
  const showError = (content: notificationContentType) => {
    toast.error(content);
  };
  const showReactHookFormError = (rhfError: {
    [key: string]: {
      message: string;
    };
  }) => {
    toast.error(rhfError[Object.keys(rhfError)[0]].message);
  };
  return {
    showSuccess,
    showError,
    showReactHookFormError,
  };
};

export default Notification;
