'use client';
import { IApproveBase } from '@business-layer/services/entities/approve';
import CustomButton from '@presentational/atoms/CustomButton';
import ImageInput from '@presentational/atoms/ImageInput';
import { useNotification } from '@presentational/atoms/Notification';
import PreviewImage from '@presentational/atoms/PreviewImage';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectAdLocationPopup from './SelectAdLocationPopup';
import ModernSelect, {
  modernSelectOptionType,
} from '@presentational/atoms/ModernSelect';
import {
  IAdLocation,
  IAdsBoard,
  ISetting,
} from '@business-layer/services/entities';
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
import { useAdBoardTypeSettings } from '@business-layer/business-logic/lib/setting';

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
  const [adBoardTypes, setAdBoardTypes] = useState<ISetting[] | null>(null);
  const { onGetAdBoardTypeSettings } = useAdBoardTypeSettings();
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
  const [adBoardInfo, setAdBoardInfo] = useState({
    type: '',
    width: '',
    height: '',
  });
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
  useEffect(() => {
    onGetAdBoardTypeSettings()
      .then((data) => setAdBoardTypes(data))
      .catch((error) => console.error(error));
  }, []);
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
    // const selectedAdBoard = adsBoardFromLocation
    //   ? adsBoardFromLocation.find((adBoard) => adBoard.selected === true)
    //   : null;
    // if (!selectedAdBoard) {
    //   showError('Bạn chưa chọn bảng quảng cáo phù hợp');
    //   return;
    // }
    if (
      Number.parseInt(adBoardInfo.height) <= 0 ||
      Number.parseInt(adBoardInfo.width) <= 0 ||
      adBoardInfo.type === ''
    ) {
      showError('Thông tin bảng quảng cáo chưa phù hợp');
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
            adsType: adBoardInfo.type,
            width: Number.parseInt(adBoardInfo.width),
            height: Number.parseInt(adBoardInfo.height),
            image: imgPath.path,
          },
        })
      )
      .then((msg) => {
        showSuccess(msg);
        router.push(OFFICER_PAGES.REQUEST_LIST);
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
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  // const handleChooseAdBoard = (adBoardId: number) => {
  //   if (Array.isArray(adsBoardFromLocation)) {
  //     setAdsBoardFromLocation(
  //       adsBoardFromLocation.map((adBoard) =>
  //         adBoard.boardData.id === adBoardId
  //           ? {
  //               ...adBoard,
  //               selected: true,
  //             }
  //           : adBoard
  //       )
  //     );
  //   }
  // };

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
            htmlFor="newAdsApproveContent"
            className="text-xs font-semibold opacity-60"
          >
            Nội dung quảng cáo
          </label>
          <textarea
            id="newAdsApproveContent"
            placeholder="Mô tả ngắn gọn về quảng cáo của bạn..."
            {...register('adsContent')}
            style={{ display: 'block' }}
            disabled={isCreatingRequest || isUploading}
            className="disabled:cursor-not-allowed disabled:bg-zinc-100 border-solid border-[1px] border-zinc-400 px-4 py-3 h-24 rounded outline-none bg-transparent text-xs font-medium resize-none w-full"
          />
        </div>

        <div className="shadow-sm  overflow-x-auto overflow-x-hidden rounded-md col-span-4">
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
                  Bảng quảng cáo
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
                <td className="border-r border-zinc-400 p-3 flex flex-col justify-center items-center">
                  <div className="w-auto h-8">
                    <ModernSelect
                      onOptionSelect={(
                        selectedOption: modernSelectOptionType
                      ) => {
                        setAdBoardInfo({
                          ...adBoardInfo,
                          type: selectedOption.name,
                        });
                      }}
                      defaultValue={'Chọn kiểu bảng'}
                      options={
                        adBoardTypes
                          ? adBoardTypes.map((type) => ({
                              name: type.name,
                              value: type.name,
                              defaultChecked: false,
                            }))
                          : null
                      }
                      style="clean"
                      // disabled={isLoading || isUploading}
                    />
                  </div>

                  <input
                    type="number"
                    placeholder="Chiều rộng (m)"
                    // disabled={isLoading || isUploading}
                    onChange={(e) => {
                      setAdBoardInfo({
                        ...adBoardInfo,
                        width: e.target.value,
                      });
                    }}
                    className="disabled:cursor-not-allowed border-solid border-[1px] border-zinc-400 px-3 py-2 my-2 w-28 col-start-2 row-start-1 col-span-1 row-span-1"
                  />

                  <input
                    type="number"
                    placeholder="Chiều cao (m)"
                    // disabled={isLoading || isUploading}
                    onChange={(e) => {
                      setAdBoardInfo({
                        ...adBoardInfo,
                        height: e.target.value,
                      });
                    }}
                    className="disabled:cursor-not-allowed border-solid border-[1px] border-zinc-400 px-3 py-2 mb-2 w-28 col-start-2 row-start-1 col-span-1 row-span-1"
                  />
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
