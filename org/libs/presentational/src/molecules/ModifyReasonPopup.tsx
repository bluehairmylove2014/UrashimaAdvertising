import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import { useForm } from 'react-hook-form';
import MessageImage from '@assets/message.png';
import Image from 'next/image';
import {
  reasonsInputSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';

type modifyReasonPopupParamsType = {
  onSubmit: (data: formData) => void;
  isActive: boolean;
  onClose: () => void;
};
type formData = {
  reasons: string;
};
function ModifyReasonPopup({
  onSubmit,
  isActive,
  onClose,
}: modifyReasonPopupParamsType) {
  const reasonsInputResolver = useYupValidationResolver(reasonsInputSchema);
  const { showReactHookFormError } = useNotification();
  const { handleSubmit, reset, register, watch } = useForm<formData>({
    defaultValues: {
      reasons: '',
    },
    resolver: reasonsInputResolver,
  });
  const reasonsWatch = watch('reasons');
  const handleSuccessSubmit = (data: formData) => {
    onSubmit && onSubmit(data);
    onClose && onClose();
    reset();
  };

  return (
    <div
      style={{ display: isActive ? 'flex' : 'none' }}
      className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex-col justify-center items-center"
    >
      <form
        onSubmit={handleSubmit(handleSuccessSubmit, showReactHookFormError)}
        className="bg-white rounded overflow-hidden p-6 w-1/2 h-fit"
      >
        <div className="flex flex-row justify-start items-center gap-3">
          <Image src={MessageImage} alt="message" width={100} height={100} />
          <p>
            Để gửi yêu cầu chỉnh sửa tới Sở VH-TT. Vui lòng cho biết lý do bạn
            chỉnh sửa điểm quảng cáo này là gì ?{' '}
          </p>
        </div>
        <div className="w-full h-40 border-solid border-[1px] border-zinc-400 mt-4">
          <textarea
            placeholder="Nhập nội dung vào đây..."
            className="resize-none w-full h-full outline-none bg-transparent border-none p-3 text-xs"
            {...register('reasons')}
          />
        </div>
        <div className="flex flex-row justify-end mt-2">
          <small
            className={`${reasonsWatch.length > 1000 ? 'text-red-600' : 'text-black'
              }`}
          >
            {reasonsWatch.length} / 1000
          </small>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-4 mt-4">
          <CustomButton
            style="fill-secondary"
            type="button"
            onClick={() => {
              onClose && onClose();
              reset();
            }}
          >
            Huỷ bỏ
          </CustomButton>
          <CustomButton style="fill-primary" type="submit">
            Xác nhận
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default ModifyReasonPopup;
