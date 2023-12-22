'use client';
import { IApproveBase } from '@business-layer/services/entities/approve';
import CustomButton from '@presentational/atoms/CustomButton';
import ImageInput from '@presentational/atoms/ImageInput';
import { useNotification } from '@presentational/atoms/Notification';
import PreviewImage from '@presentational/atoms/PreviewImage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type createNewApproveFormType = Pick<
  IApproveBase,
  | 'companyName'
  | 'email'
  | 'phone'
  | 'address'
  | 'contractStart'
  | 'contractEnd'
  | 'adsPointId'
  | 'adsContent'
>;

function CreateNewApproveForm() {
  const [adBoardImage, setAdBoardImage] = useState<File | null>(null);
  const { register, reset, handleSubmit } = useForm<createNewApproveFormType>({
    defaultValues: {
      companyName: '',
      email: '',
      phone: '',
      address: '',
      contractStart: '',
      contractEnd: '',
      adsPointId: -1,
      adsContent: '',
    },
  });
  const { showReactHookFormError } = useNotification();

  const createNewApproveRequest = (data: createNewApproveFormType) => {
    console.log(data);
  };

  return (
    <form
      className="grid grid-cols-4 gap-4"
      onSubmit={handleSubmit(createNewApproveRequest, showReactHookFormError)}
      noValidate
    >
      <input
        type="text"
        {...register('companyName')}
        placeholder="Tên công ty"
        className="border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium col-start-1 col-span-2 row-start-1 row-span-1"
      />
      <input
        type="email"
        {...register('email')}
        placeholder="Email"
        className="border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium col-start-3 col-span-1 row-start-1 row-span-1"
      />
      <input
        type="text"
        {...register('phone')}
        placeholder="Số điện thoại"
        className="border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium col-start-4 col-span-1 row-start-1 row-span-1"
      />
      <input
        type="text"
        {...register('address')}
        placeholder="Địa chỉ công ty"
        className="border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium col-start-1 col-span-4 row-start-2 row-span-1"
      />
      <div className="col-start-1 col-span-2 row-start-3 row-span-1">
        <label
          htmlFor="contractStart"
          className="text-xs font-semibold opacity-60"
        >
          Ngày giờ bắt đầu
        </label>
        <input
          id="contractStart"
          type="datetime-local"
          {...register('contractStart')}
          onKeyDown={() => false}
          className="border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium w-full"
        />
      </div>

      <div className="col-start-3 col-span-2 row-start-3 row-span-1">
        <label
          htmlFor="contractEnd"
          className="text-xs font-semibold opacity-60"
        >
          Ngày giờ kết thúc
        </label>
        <input
          id="contractEnd"
          type="datetime-local"
          {...register('contractEnd')}
          onKeyDown={() => false}
          className="border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium w-full"
        />
      </div>

      <textarea
        {...register('adsContent')}
        placeholder="Nội dung quảng cáo (Mô tả ngắn gọn về quảng cáo của bạn)"
        className="border-solid border-[1px] border-zinc-400 px-4 py-3 h-24 rounded outline-none bg-transparent text-xs font-medium col-start-1 col-span-4 row-start-4 row-span-1 resize-none"
      />

      {adBoardImage ? (
        <div className="col-start-1 col-span-4 flex flex-row justify-start items-center gap-6">
          <PreviewImage width={180} height={180} imgPreview={adBoardImage} />
          <button
            type="button"
            className=" ml-2 text-sm text-red-600 hover:text-red-800 transition-colors"
            onClick={() => setAdBoardImage(null)}
            disabled={false}
          >
            <i className="fi fi-sr-trash-xmark"></i>
          </button>
        </div>
      ) : (
        <ImageInput
          onSelectImages={(imageList: FileList) => {
            setAdBoardImage(imageList.item(0) || null);
          }}
          style="button"
          limit={1}
          disabled={false}
        />
      )}

      <div className="col-start-1 col-span-4 grid place-items-center">
        <div className="w-28 h-fit">
          <CustomButton type="submit" style="fill-green">
            Xin cấp phép
          </CustomButton>
        </div>
      </div>
    </form>
  );
}

export default CreateNewApproveForm;
