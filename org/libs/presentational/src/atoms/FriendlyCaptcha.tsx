import { useCaptchaHook } from '@business-layer/business-logic/lib/friendlyCaptcha';
import { useEffect } from 'react';
import { useVerifySolution } from '@business-layer/business-logic/lib/friendlyCaptcha';
import { useNotification } from './Notification';

const FriendlyCaptcha = ({
  onSuccessVerify,
}: {
  onSuccessVerify: () => void;
}) => {
  const sitekey = process.env.NEXT_PUBLIC_FRIENDLY_SITE_KEY;
  if (sitekey === undefined) {
    throw new Error('No sitekey found in .env file!');
  }
  const captchaHook = useCaptchaHook({
    siteKey: sitekey,
    endpoint: 'GLOBAL1',
    language: 'en',
    startMode: 'none',
    showAttribution: true,
  });
  const { onVerifySolution, isLoading } = useVerifySolution();
  const { showError, showSuccess } = useNotification();

  useEffect(() => {
    if (captchaHook.captchaStatus.solution !== null) {
      onVerifySolution(captchaHook.captchaStatus.solution)
        .then((msg) => {
          showSuccess(msg);
          onSuccessVerify();
        })
        .catch((error) => showError(error.message));
    }
  }, [captchaHook.captchaStatus]);

  return (
    <>
      {captchaHook.CaptchaWidget({
        className: 'px-2 py-4 rounded w-full',
      })}
      <p
        className="font-semibold"
        style={{ display: isLoading ? 'block' : 'none' }}
      >
        Đang xác thực cấp 2...
      </p>
    </>
  );
};

export default FriendlyCaptcha;
