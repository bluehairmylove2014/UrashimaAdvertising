'use client';
import { IApproveBase } from '@business-layer/services/entities/approve';
import CustomButton from '@presentational/atoms/CustomButton';
import ImageInput from '@presentational/atoms/ImageInput';
import { useNotification } from '@presentational/atoms/Notification';
import PreviewImage from '@presentational/atoms/PreviewImage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectAdLocationPopup from './SelectAdLocationPopup';
import { modernSelectOptionType } from '@presentational/atoms/ModernSelect';
import { IAdLocation, IAdsBoard } from '@business-layer/services/entities';
import { useGetOfficerAdDetail } from '@business-layer/business-logic/lib/officerAds/process/hooks';
import { useCreateNewAdBoardApproveRequest } from '@business-layer/business-logic/lib/approve/process/hooks';
import EmptyIcon from '@presentational/atoms/EmptyIcon';
import CommonLoader from '@presentational/atoms/CommonLoader';
import Image from 'next/image';
import {
  approveRequestFormSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import {
  getCurrentDateTime,
  isDateGreaterThan,
  nDaysFromToday,
} from '@utils/helpers';
import { useUpload } from '@business-layer/business-logic/lib/sirv';
import { useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';
import { renameImageWithUniqueName } from '@utils/helpers/imageName';

type createNewApproveFormType = Pick<
  IApproveBase,
  | 'companyName'
  | 'email'
  | 'phone'
  | 'address'
  | 'contractStart'
  | 'contractEnd'
  | 'adsContent'
>;

function CreateNewApproveForm({
  adsFormOptions,
  locationTypeOptions,
}: {
  adsFormOptions: modernSelectOptionType[];
  locationTypeOptions: modernSelectOptionType[];
}) {
  const router = useRouter();
  const [adBoardImage, setAdBoardImage] = useState<File | null>(null);
  const resolver = useYupValidationResolver(approveRequestFormSchema);
  const { register, reset, handleSubmit } = useForm<createNewApproveFormType>({
    defaultValues: {
      companyName: '',
      email: '',
      phone: '',
      address: '',
      contractStart: '',
      contractEnd: '',
      adsContent: '',
    },
    resolver,
  });
  const { showReactHookFormError, showError, showSuccess } = useNotification();
  const [isSelectAdLocationPopupActive, setIsSelectAdLocationPopupActive] =
    useState<boolean>(false);
  const [selectedAdLocation, setSelectedAdLocation] =
    useState<IAdLocation | null>(null);
  const [adsBoardFromLocation, setAdsBoardFromLocation] = useState<
    | {
        boardData: IAdsBoard;
        selected: boolean;
      }[]
    | null
  >(null);
  const { onGetOfficerAdDetail, isLoading: isGettingOfficerAdDetail } =
    useGetOfficerAdDetail();
  const { onCreateNewAdBoardApproveRequest, isLoading: isCreatingRequest } =
    useCreateNewAdBoardApproveRequest();
  const { onUpload, isLoading: isUploading } = useUpload();

  // Methods
  const createNewApproveRequest = (data: createNewApproveFormType) => {
    if (
      isDateGreaterThan(
        nDaysFromToday(1).toISOString().slice(0, 16),
        data.contractStart
      )
    ) {
      showError('Ngày bắt đầu hợp đồng phải lớn hơn thời điểm hiện tại 1 ngày');
      return;
    }
    if (
      isDateGreaterThan(
        nDaysFromToday(10).toISOString().slice(0, 16),
        data.contractEnd
      )
    ) {
      showError(
        'Ngày kết thúc hợp đồng phải lớn hơn thời điểm hiện tại 10 ngày'
      );
      return;
    }
    if (!isDateGreaterThan(data.contractEnd, data.contractStart)) {
      showError('Ngày kết thúc phải lớn ngày hiện tại');
      return;
    }
    if (!selectedAdLocation) {
      showError('Bạn chưa chọn điểm quảng cáo');
      return;
    }
    const selectedAdBoard = adsBoardFromLocation
      ? adsBoardFromLocation.find((adBoard) => adBoard.selected === true)
      : null;
    if (!selectedAdBoard) {
      showError('Bạn chưa chọn bảng quảng cáo phù hợp');
      return;
    }
    if (!adBoardImage) {
      showError('Bạn chưa chọn hình ảnh cho quảng cáo');
      return;
    }

    onUpload({
      imgFile: renameImageWithUniqueName(adBoardImage),
      path: '/UrashimaAds Hub/locations',
    })
      .then((imgPath) =>
        onCreateNewAdBoardApproveRequest({
          ...data,
          adsPointId: selectedAdLocation.id,
          adsBoard: {
            adsPointId: selectedAdLocation.id,
            adsType: selectedAdBoard.boardData.adsType,
            width: selectedAdBoard.boardData.width,
            height: selectedAdBoard.boardData.height,
            image: imgPath.path,
          },
        })
      )
      .then((msg) => {
        showSuccess(msg);
        router.push(OFFICER_PAGES.APPROVE_LIST);
        reset();
      })
      .catch((error) => showError(error.message));
  };
  const handleSelectAdLocation = (adLocationData: IAdLocation) => {
    setSelectedAdLocation(adLocationData);
    onGetOfficerAdDetail(adLocationData.id)
      .then((data) => {
        setAdsBoardFromLocation(
          data.adsBoard.map((ab) => ({ boardData: ab, selected: false }))
        );
      })
      .catch((error) => {
        showError(error.message);
      });
    console.log('SCROLL');
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  const handleChooseAdBoard = (adBoardId: number) => {
    if (Array.isArray(adsBoardFromLocation)) {
      setAdsBoardFromLocation(
        adsBoardFromLocation.map((adBoard) =>
          adBoard.boardData.id === adBoardId
            ? {
                ...adBoard,
                selected: true,
              }
            : adBoard
        )
      );
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-4 gap-4"
        onSubmit={handleSubmit(createNewApproveRequest, showReactHookFormError)}
        noValidate
      >
        <div className="col-start-1 col-span-2 row-start-1 row-span-1">
          <label
            htmlFor="companyName"
            className="text-xs font-semibold opacity-60"
          >
            Tên công ty
          </label>
          <input
            type="text"
            id="companyName"
            {...register('companyName')}
            placeholder="Công ty TNHH ABC"
            disabled={isCreatingRequest || isUploading}
            className="disabled:cursor-not-allowed disabled:bg-zinc-100 border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium w-full"
          />
        </div>
        <div className="col-start-3 col-span-1 row-start-1 row-span-1">
          <label htmlFor="email" className="text-xs font-semibold opacity-60">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="example@gmail.com"
            disabled={isCreatingRequest || isUploading}
            className="disabled:cursor-not-allowed disabled:bg-zinc-100 border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium w-full"
          />
        </div>
        <div className="col-start-4 col-span-1 row-start-1 row-span-1">
          <label htmlFor="phone" className="text-xs font-semibold opacity-60">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            {...register('phone')}
            placeholder="Ví dụ: 0337182467"
            disabled={isCreatingRequest || isUploading}
            className="disabled:cursor-not-allowed disabled:bg-zinc-100 border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium w-full"
          />
        </div>
        <div className="col-start-1 col-span-4 row-start-2 row-span-1">
          <label htmlFor="address" className="text-xs font-semibold opacity-60">
            Địa chỉ công ty
          </label>
          <input
            type="text"
            id="address"
            {...register('address')}
            placeholder="Địa chỉ trụ sở chính của công ty bạn"
            disabled={isCreatingRequest || isUploading}
            className="disabled:cursor-not-allowed disabled:bg-zinc-100 border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium w-full"
          />
        </div>
        <div className="col-start-1 col-span-2 row-start-3 row-span-1">
          <label htmlFor="contractStart" className="opacity-60">
            <span className="text-xs font-semibold">Ngày giờ bắt đầu</span>{' '}
            <small>({'>'} 1 ngày kể từ giờ)</small>
          </label>
          <input
            id="contractStart"
            type="datetime-local"
            {...register('contractStart')}
            onKeyDown={() => false}
            disabled={isCreatingRequest || isUploading}
            className="disabled:cursor-not-allowed disabled:bg-zinc-100 border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium w-full"
          />
        </div>

        <div className="col-start-3 col-span-2 row-start-3 row-span-1">
          <label htmlFor="contractEnd" className="opacity-60">
            <span className="text-xs font-semibold">Ngày giờ kết thúc</span>{' '}
            <small>({'>'} 10 ngày kể từ giờ)</small>
          </label>
          <input
            id="contractEnd"
            type="datetime-local"
            {...register('contractEnd')}
            onKeyDown={() => false}
            disabled={isCreatingRequest || isUploading}
            className="disabled:cursor-not-allowed disabled:bg-zinc-100 border-solid border-[1px] border-zinc-400 px-4 py-3 rounded outline-none bg-transparent text-xs font-medium w-full"
          />
        </div>

        <div className="col-start-1 col-span-4 row-start-4 row-span-1">
          <label
            htmlFor="adsContent"
            className="text-xs font-semibold opacity-60"
          >
            Nội dung quảng cáo
          </label>
          <textarea
            id="adsContent"
            placeholder="Mô tả ngắn gọn về quảng cáo của bạn..."
            {...register('adsContent')}
            disabled={isCreatingRequest || isUploading}
            className="disabled:cursor-not-allowed disabled:bg-zinc-100 border-solid border-[1px] border-zinc-400 px-4 py-3 h-24 rounded outline-none bg-transparent text-xs font-medium resize-none w-full"
          />
        </div>

        <div className="shadow-sm overflow-x-auto overflow-y-hidden rounded-md col-span-4">
          <table className="w-full table-auto text-xs text-center border-collapse border">
            <thead className="bg-indigo-950 text-white font-semibold">
              <tr>
                <th
                  rowSpan={2}
                  scope="col"
                  className="px-2 py-3 border-r border-white"
                >
                  Điểm quảng cáo
                </th>
                <th
                  colSpan={2}
                  scope="col"
                  className="px-2 py-3 border-b border-white"
                >
                  Thông tin bảng quảng cáo
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-2 py-3 border-r border-white">
                  Bảng quảng cáo hiện có
                </th>
                <th scope="col" className="px-2 py-3">
                  Hình ảnh
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 border-r border-zinc-400">
                  <span className="w-full grid place-items-center">
                    {selectedAdLocation ? (
                      <>
                        <span className="col-span-full mb-1">
                          <b>Địa chỉ: </b>
                          {selectedAdLocation.address}
                        </span>
                        <span className="col-span-full mb-1">
                          <b>Hình thức: </b>
                          {selectedAdLocation.adsForm}
                        </span>
                        <span className="col-span-full mb-1">
                          <b>Loại: </b>
                          {selectedAdLocation.locationType}
                        </span>
                        <span className="col-span-full mb-1">
                          <b>Quy hoạch: </b>
                          {selectedAdLocation.planned ? (
                            <b className="text-green-600">Đã uy hoạch</b>
                          ) : (
                            <b className="text-red-600">Chưa quy hoạch</b>
                          )}
                        </span>
                        <span className="w-40 col-span-full flex flex-row justify-start items-center gap-6">
                          <CustomButton
                            style="fill-secondary"
                            type="button"
                            onClick={() =>
                              setIsSelectAdLocationPopupActive(true)
                            }
                          >
                            Đổi điểm khác
                          </CustomButton>
                        </span>
                      </>
                    ) : (
                      <span className="w-40 col-span-full flex flex-row justify-start items-center gap-6">
                        <CustomButton
                          style="fill-secondary"
                          type="button"
                          onClick={() => setIsSelectAdLocationPopupActive(true)}
                        >
                          Chọn điểm quảng cáo
                        </CustomButton>
                      </span>
                    )}
                  </span>
                </td>
                <td className="border-r border-zinc-400">
                  {isGettingOfficerAdDetail ? (
                    <span className="py-4 w-full grid place-items-center">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </span>
                  ) : Array.isArray(adsBoardFromLocation) ? (
                    adsBoardFromLocation.length > 0 ? (
                      <span className="flex flex-col items-center justify-between w-full h-full">
                        <h6 className="flex-grow mb-2 w-full">
                          Chọn duy nhất 1
                        </h6>
                        <span className="flex-shrink w-full">
                          {adsBoardFromLocation.map((adBoard) => (
                            <button
                              onClick={() =>
                                handleChooseAdBoard(adBoard.boardData.id)
                              }
                              type="button"
                              key={adBoard.boardData.id}
                              className={`${
                                adBoard.selected
                                  ? '!bg-blue-200 hover:!bg-blue-200'
                                  : ''
                              } flex flex-row items-center text-xs font-medium gap-3 py-3 px-4 border-t-[1px] border-b-[1px] border-zinc-100 bg-white hover:bg-zinc-100 w-full h-fit`}
                            >
                              <Image
                                src={adBoard.boardData.image}
                                alt={adBoard.boardData.adsType}
                                width={70}
                                height={70}
                              />
                              <span>{adBoard.boardData.adsType}</span>
                              <span>
                                {adBoard.boardData.width}m x{' '}
                                {adBoard.boardData.height}m (w x h)
                              </span>
                            </button>
                          ))}
                        </span>
                      </span>
                    ) : (
                      <span className="py-4">
                        <EmptyIcon label="Không có bảng quảng cáo nào" />
                      </span>
                    )
                  ) : (
                    <>Chọn điểm quảng cáo để hiển thị thông tin</>
                  )}
                </td>
                <td className="py-4">
                  {adBoardImage ? (
                    <span className="flex flex-row justify-center items-center gap-6">
                      <PreviewImage
                        width={180}
                        height={180}
                        imgPreview={adBoardImage}
                      />
                      <button
                        type="button"
                        className=" ml-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                        onClick={() => setAdBoardImage(null)}
                        disabled={false}
                      >
                        <i className="fi fi-sr-trash-xmark"></i>
                      </button>
                    </span>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-start-1 col-span-4 grid place-items-center">
          <div className="w-36 h-fit">
            <CustomButton
              type="submit"
              style="fill-green"
              loading={isCreatingRequest || isUploading}
            >
              Xin cấp phép
            </CustomButton>
          </div>
        </div>
      </form>
      <SelectAdLocationPopup
        isActive={isSelectAdLocationPopupActive}
        handleClose={() => setIsSelectAdLocationPopupActive(false)}
        adsFormOptions={adsFormOptions}
        locationTypeOptions={locationTypeOptions}
        handleSelect={handleSelectAdLocation}
      />
    </>
  );
}

export default CreateNewApproveForm;
