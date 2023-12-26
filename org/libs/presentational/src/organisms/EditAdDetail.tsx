'use client';

import {
  IAdLocationDetail,
  IAdsBoard,
} from '@business-layer/services/entities';
import Thumbnail from '@presentational/atoms/Thumbnail';
import TableRow from '@presentational/molecules/TableRow';
import RowLoader from '@presentational/atoms/RowLoader';
import EmptyIcon from '@presentational/atoms/EmptyIcon';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ModernSelect, {
  modernSelectOptionType,
} from '@presentational/atoms/ModernSelect';
import Switch from '@presentational/atoms/Switch';
import { useNotification } from '@presentational/atoms/Notification';
import {
  editLocationDetailSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import ImageInput from '@presentational/atoms/ImageInput';
import { createRef, useEffect, useRef, useState } from 'react';
import { useModifyAdLocationDetail } from './../../../business-layer/src/business-logic/lib/officerAds/process/hooks/useModifyAdLocationDetail';
import CustomButton from '@presentational/atoms/CustomButton';
import ModifyReasonPopup from '@presentational/molecules/ModifyReasonPopup';
import { useUpload } from '@business-layer/business-logic/lib/sirv';
import { renameImageWithUniqueName } from '@utils/helpers/imageName';

const DEFAULT_THUMBNAIL_WIDTH = 120;
const DEFAULT_THUMBNAIL_HEIGHT = 120;

function EditAdDetail({
  adData,
  locationOptions,
  adsFormOptions,
  adsTypeOptions,
}: {
  adData: IAdLocationDetail;
  locationOptions: modernSelectOptionType[];
  adsFormOptions: modernSelectOptionType[];
  adsTypeOptions: modernSelectOptionType[];
}) {
  const editLocationResolver = useYupValidationResolver(
    editLocationDetailSchema
  );
  const { handleSubmit, getValues, setValue, control, watch, register } =
    useForm<IAdLocationDetail>({
      defaultValues: {
        ...adData,
      },
      resolver: editLocationResolver,
    });
  const { fields } = useFieldArray({
    control: control,
    name: 'adsBoard',
  });
  const locationImagesWatch = watch('images');
  const adsBoardWatch = watch('adsBoard');
  const isPlannedWatch = watch('planned');
  const { showError, showReactHookFormError, showSuccess } = useNotification();
  const additionLocationImages = useRef<{ blobUrl: string; file: File }[]>([]);
  const additionAdsBoardImages = useRef<
    { boardId: Number; blobUrl: string; file: File }[]
  >([]);
  const { onModifyAdLocationDetail, isLoading } = useModifyAdLocationDetail();
  const [isReasonPopupOpen, setIsReasonPopupOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { onUpload } = useUpload();

  useEffect(() => {
    console.log('log: ', additionLocationImages.current);
  }, [additionLocationImages.current.length]);

  // methods
  const onSuccessSubmit = (data: IAdLocationDetail) => {
    setIsReasonPopupOpen(true);
  };
  const handleDeleteLocationImage = (image: string) => {
    setValue(
      'images',
      locationImagesWatch.filter((img) => img.image !== image)
    );
    const sameAdditionImageIndex = additionLocationImages.current.findIndex(
      (aimg) => aimg.blobUrl === image
    );
    if (sameAdditionImageIndex !== -1) {
      additionLocationImages.current.splice(sameAdditionImageIndex, 1);
    }
  };
  const handleAddLocationImage = (images: FileList) => {
    const imgBlobList: { image: string }[] = [];
    Array.from(images).map((img: File) => {
      const imgWithNewName = renameImageWithUniqueName(img);

      const imgBlobUrl = URL.createObjectURL(imgWithNewName);
      imgBlobList.push({ image: imgBlobUrl });
      additionLocationImages.current.push({
        blobUrl: imgBlobUrl,
        file: imgWithNewName,
      });
    });
    setValue('images', [...locationImagesWatch, ...imgBlobList]);
  };
  const handleChangeAdBoardImage = (
    id: number | undefined,
    imageFile: File | null
  ) => {
    if (imageFile && id) {
      const imgBlobUrl = URL.createObjectURL(imageFile);
      const sameBoardIndex = additionAdsBoardImages.current.findIndex(
        (aimg) => aimg.boardId === id
      );
      if (sameBoardIndex !== -1) {
        additionAdsBoardImages.current[sameBoardIndex] = {
          boardId: id,
          blobUrl: imgBlobUrl,
          file: imageFile,
        };
      } else {
        additionAdsBoardImages.current.push({
          boardId: id,
          blobUrl: imgBlobUrl,
          file: imageFile,
        });
      }
      setValue(
        'adsBoard',
        adsBoardWatch.map((adboard) =>
          adboard.id === id ? { ...adboard, image: imgBlobUrl } : adboard
        )
      );
    } else {
      showError('Lỗi tải hình ảnh lên!');
    }
  };
  const onUploadImageToCDN = async () => {
    try {
      let locationImagesPathData = null;
      let adsBoardImagesPathData = null;
      setIsUploading(true);

      if (additionLocationImages.current.length > 0) {
        locationImagesPathData = await Promise.all(
          Array.from(additionLocationImages.current).map((img) =>
            onUpload({
              imgFile: img.file,
              path: `/UrashimaAds Hub/locations/${getValues().id}`,
            })
          )
        );
      }
      if (additionAdsBoardImages.current.length > 0) {
        adsBoardImagesPathData = await Promise.all(
          Array.from(additionAdsBoardImages.current).map((img, index) =>
            onUpload({
              imgFile: img.file,
              path: `/UrashimaAds Hub/ads/${getValues().id}`,
            })
          )
        );
      }
      setIsUploading(false);
      return {
        locationImages: locationImagesPathData,
        adsBoardImages: adsBoardImagesPathData,
      };
    } catch (error: any) {
      showError(error.message);
    }
  };
  const onModify = ({ reasons }: { reasons: string }) => {
    // UPLOAD TO CDN
    onUploadImageToCDN().then((imgData) => {
      const formData = getValues();
      const modifyData: IAdLocationDetail = {
        ...formData,
        images: formData.images.map((fi) => {
          if (fi.image.includes('blob:')) {
            const suitableName = imgData?.locationImages?.find(
              (img) =>
                img.path.slice(img.path.lastIndexOf('/') + 1) ===
                additionLocationImages.current.find(
                  (ai) => ai.blobUrl === fi.image
                )?.file.name
            );
            if (!suitableName) {
              showError('Lỗi thay đổi hình ảnh địa điểm');
              return fi;
            } else {
              return {
                image: suitableName.path,
              };
            }
          } else {
            return fi;
          }
        }),
        adsBoard: formData.adsBoard.map((ad) => {
          if (ad.image.includes('blob:')) {
            const suitableName = imgData?.adsBoardImages?.find(
              ({ path }) =>
                path.slice(path.lastIndexOf('/') + 1) ===
                additionAdsBoardImages.current.find(
                  (ai) => ai.boardId === ad.id
                )?.file.name
            );
            if (!suitableName) {
              showError('Lỗi thay đổi hình ảnh bảng quảng cáo');
              return ad;
            } else {
              return {
                ...ad,
                image: suitableName?.path,
              };
            }
          } else {
            return ad;
          }
        }),
      };
      onModifyAdLocationDetail({
        ...modifyData,
        reasons: reasons,
      })
        .then((msg) => showSuccess(msg))
        .catch((error) => showError(error.message))
        .finally(() => {
          Object.keys(modifyData).forEach((key) =>
            setValue(
              key as keyof IAdLocationDetail,
              modifyData[key as keyof IAdLocationDetail]
            )
          );
          additionAdsBoardImages.current = [];
          additionLocationImages.current = [];
        });
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSuccessSubmit, showReactHookFormError)}
        noValidate
      >
        <div className="grid gap-6 border-solid border-b-[1px] border-b-zinc-300 pb-5 mb-5">
          <div className="col-span-1 col-start-1 row-start-1 w-full">
            <div className="flex flex-row justify-start items-center mb-2 w-full">
              <h5 className="font-semibold text-sm whitespace-nowrap">
                <i className="fi fi-sr-map-marker-home mr-2"></i>
                Địa điểm:
              </h5>
              <div className="border-solid border-[1px] border-zinc-400 rounded overflow-hidden w-full h-8 ml-4">
                <Controller
                  name="address"
                  control={control}
                  disabled={isLoading || isUploading}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="address-ad-location"
                      placeholder="Example: 397 Williams ShoalSouth Warren"
                      {...field}
                      className="disabled:cursor-not-allowed w-full h-full px-4 outline-none text-ellipsis text-xs"
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-row justify-start items-center mb-2">
              <h5 className="font-semibold text-sm whitespace-nowrap">
                <i className="fi fi-sr-layers mr-2"></i>
                Phân loại:
              </h5>

              <div className="relative h-8 ml-[0.875rem]">
                <ModernSelect
                  onOptionSelect={(selectedOption: modernSelectOptionType) => {
                    typeof selectedOption.value === 'string' &&
                      setValue('locationType', selectedOption.value);
                  }}
                  options={locationOptions}
                  style="clean"
                  defaultValue={getValues().locationType}
                  disabled={isLoading || isUploading}
                />
              </div>
            </div>

            <div className="flex flex-row justify-start items-center mb-2">
              <h5 className="font-semibold text-sm whitespace-nowrap">
                <i className="fi fi-sr-ad mr-2"></i>
                Hình thức:
              </h5>
              <div className="relative h-8 ml-[0.6rem]">
                <ModernSelect
                  onOptionSelect={(selectedOption: modernSelectOptionType) => {
                    typeof selectedOption.value === 'string' &&
                      setValue('adsForm', selectedOption.value);
                  }}
                  options={adsFormOptions}
                  style="clean"
                  defaultValue={getValues().adsForm}
                  disabled={isLoading || isUploading}
                />
              </div>
            </div>

            <div className="flex flex-row justify-start items-center mb-2">
              <h5 className="font-semibold text-sm whitespace-nowrap">
                <i className="fi fi-sr-megaphone mr-2"></i>
                Tình trạng:
              </h5>
              <div className="mx-2">
                <Switch
                  defaultValue={isPlannedWatch}
                  onChange={(value) => {
                    setValue('planned', value);
                  }}
                  disabled={isLoading || isUploading}
                />
              </div>

              {isPlannedWatch ? (
                <p className="font-bold text-green-600 relative -bottom-[0.1rem]">
                  Đã quy hoạch
                </p>
              ) : (
                <p className="font-bold text-red-600 relative -bottom-[0.1rem]">
                  Chưa quy hoạch
                </p>
              )}
            </div>
          </div>
          <div className="col-span-1 col-start-2 row-start-1">
            <h5 className=" mb-2 font-semibold text-sm">
              <i className="fi fi-sr-graphic-style mr-2"></i>
              Hình ảnh địa điểm:
            </h5>
            <div className="grid grid-cols-4 w-fit gap-4 mb-2">
              {locationImagesWatch.map((img, index) => (
                <div
                  className="relative w-fit h-fit rounded overflow-hidden"
                  key={`${img.image}@${index}`}
                >
                  <Thumbnail
                    width={DEFAULT_THUMBNAIL_WIDTH}
                    height={DEFAULT_THUMBNAIL_HEIGHT}
                    src={img.image}
                  />
                  <button
                    type="button"
                    disabled={isLoading || isUploading}
                    onClick={() => handleDeleteLocationImage(img.image)}
                    className="absolute top-0 left-0 w-full h-full bg-black/60 grid place-items-center opacity-0 hover:opacity-100 transition-all disabled:cursor-not-allowed disabled:hover:opacity-0"
                  >
                    <span className="text-white font-semibold text-xs">
                      <i className="fi fi-bs-trash mr-1"></i>Xoá
                    </span>
                  </button>
                </div>
              ))}
              <div style={{ maxHeight: '120px' }}>
                <ImageInput
                  style="fill"
                  isAbortLimitSize={false}
                  onSelectImages={handleAddLocationImage}
                  disabled={isLoading || isUploading}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h5 className="font-semibold text-sm whitespace-nowrap mb-8">
            <i className="fi fi-sr-note mr-2"></i>
            Danh sách bảng quảng cáo:
          </h5>
          <table className="w-full table-auto text-xs text-center">
            <thead className="bg-indigo-950 text-white font-semibold">
              <tr>
                <th scope="col" className="px-2 py-3">
                  STT
                </th>
                <th scope="col" className="px-2 py-3">
                  Hình ảnh bảng quảng cáo
                </th>
                <th scope="col" className="px-2 py-3">
                  Kích thước
                </th>
                <th scope="col" className="px-2 py-3">
                  Loại bảng
                </th>
                <th scope="col" className="px-2 py-3">
                  Ngày hết hạn
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(fields) ? (
                fields.length > 0 ? (
                  fields.map((ad, index) => (
                    <tr
                      className="py-4 even:bg-gray-100"
                      key={`adLocation@${ad.id}`}
                    >
                      <TableRow
                        listData={[
                          index + 1,
                          <span className="w-full grid place-items-center">
                            <button
                              type="button"
                              className="relative w-fit h-fit disabled:cursor-not-allowed"
                              onClick={() => {
                                const inputFile = document.getElementById(
                                  `adsBoardImageInput@${ad.id}`
                                );
                                if (inputFile) {
                                  inputFile.click();
                                }
                              }}
                              disabled={isLoading || isUploading}
                            >
                              <Thumbnail
                                width={200}
                                height={200}
                                src={ad.image}
                              />
                              <span className="absolute top-0 left-0 w-full h-full bg-black/60 opacity-0 hover:opacity-100 grid place-items-center">
                                <span className="text-white text-[0.65rem]">
                                  <i className="fi fi-sr-pen-field mr-2"></i>
                                  Chỉnh sửa
                                </span>
                              </span>
                              <input
                                type="file"
                                name={`adsBoardImageInput@${ad.id}`}
                                id={`adsBoardImageInput@${ad.id}`}
                                accept="image/*"
                                className="hidden"
                                multiple={false}
                                max={1}
                                onChange={(e) => {
                                  handleChangeAdBoardImage(
                                    adsBoardWatch[index].id,
                                    e.target.files?.item(0) ?? null
                                  );
                                }}
                              />
                            </button>
                          </span>,
                          <span className="grid grid-rows-2 grid-cols-2 place-items-center w-fit">
                            <span className="col-start-1 row-start-1 col-span-1 row-span-1">
                              Rộng (m)
                            </span>
                            <input
                              key={`width@${ad.id}`}
                              type="number"
                              id={`width@${ad.id}`}
                              defaultValue={ad.width}
                              placeholder="...meter"
                              min={1}
                              disabled={isLoading || isUploading}
                              {...register(`adsBoard.${index}.width`)}
                              className="disabled:cursor-not-allowed border-solid border-[1px] border-zinc-400 px-3 py-2 mb-2 w-full col-start-2 row-start-1 col-span-1 row-span-1"
                            />
                            <span className="col-start-1 row-start-2 col-span-1 row-span-2">
                              Cao (m)
                            </span>
                            <input
                              key={`height@${ad.id}`}
                              type="number"
                              id={`height@${ad.id}`}
                              defaultValue={ad.height}
                              placeholder="...meter"
                              min={1}
                              disabled={isLoading || isUploading}
                              {...register(`adsBoard.${index}.height`)}
                              className="disabled:cursor-not-allowed border-solid border-[1px] border-zinc-400 px-3 py-2 w-full col-start-2 row-start-2 col-span-1 row-span-1"
                            />
                          </span>,
                          // <input
                          //   key={`adsType@${ad.id}`}
                          //   type="text"
                          //   id={`adsType@${ad.id}`}
                          //   defaultValue={ad.adsType}
                          //   placeholder="..."
                          //   disabled={isLoading || isUploading}
                          //   {...register(`adsBoard.${index}.adsType`)}
                          //   className="disabled:cursor-not-allowed border-solid border-[1px] border-zinc-400 px-3 py-2 w-auto col-start-2 row-start-2 col-span-1 row-span-1"
                          // />
                          <select
                            key={`adsType@${ad.id}`}
                            id={`adsType@${ad.id}`}
                            defaultValue={ad.adsType}
                            disabled={isLoading || isUploading}
                            {...register(`adsBoard.${index}.adsType`)}
                            className="disabled:cursor-not-allowed border-solid border-[1px] border-zinc-400 px-3 py-2 w-auto col-start-2 row-start-2 col-span-1 row-span-1"
                          >
                            {adsTypeOptions.map((at) => (
                              <option key={at.name} value={at.value as string}>
                                {at.name}
                              </option>
                            ))}
                          </select>,
                          <input
                            key={`expiredDate${ad.id}`}
                            type="datetime-local"
                            id={`expiredDate${ad.id}`}
                            defaultValue={ad.expiredDate}
                            onKeyDown={() => false}
                            disabled={isLoading || isUploading}
                            {...register(`adsBoard.${index}.expiredDate`)}
                            className="disabled:cursor-not-allowed border-solid border-[1px] border-zinc-400 px-3 py-2 w-auto col-start-2 row-start-2 col-span-1 row-span-1 text-xs font-normal"
                          />,
                        ]}
                      />
                    </tr>
                  ))
                ) : (
                  <tr className="py-4">
                    <td colSpan={5} className="py-12">
                      <EmptyIcon label="Không có quảng cáo nào" />
                    </td>
                  </tr>
                )
              ) : (
                <RowLoader colNumber={5} />
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full mt-6 grid place-items-center">
          <div className="w-1/3 h-fit">
            <CustomButton
              style="fill-primary"
              loading={isLoading || isUploading}
              type="submit"
            >
              Yêu cầu chỉnh sửa
            </CustomButton>
          </div>
        </div>
      </form>
      <ModifyReasonPopup
        onSubmit={onModify}
        onClose={() => setIsReasonPopupOpen(false)}
        isActive={isReasonPopupOpen}
      />
    </>
  );
}

export default EditAdDetail;
