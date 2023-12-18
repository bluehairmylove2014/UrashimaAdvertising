'use client';

import {
  IAdLocationDetail,
  IAdsBoard,
} from '@business-layer/services/entities';
import Thumbnail from '@presentational/atoms/Thumbnail';
import TableRow from '@presentational/molecules/TableRow';
import RowLoader from '@presentational/atoms/RowLoader';
import EmptyIcon from '@presentational/atoms/EmptyIcon';
import { formatDate } from '@utils/helpers';
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
import { createRef, useRef } from 'react';

const DEFAULT_THUMBNAIL_WIDTH = 120;
const DEFAULT_THUMBNAIL_HEIGHT = 120;

function EditAdDetail({
  adData,
  locationOptions,
  adsFormOptions,
}: {
  adData: IAdLocationDetail;
  locationOptions: modernSelectOptionType[];
  adsFormOptions: modernSelectOptionType[];
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
  const { fields, append, remove } = useFieldArray({
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

  const onSuccessSubmit = (data: IAdLocationDetail) => {
    console.log(data);
  };

  const handleDeleteLocationImage = (image: string) => {
    setValue(
      'images',
      locationImagesWatch.filter((img) => img.image !== image)
    );
    const sameAdditionImageIndex = additionLocationImages.current.findIndex(
      (aimg) => aimg.blobUrl === image
    );
    if (sameAdditionImageIndex) {
      additionLocationImages.current.splice(sameAdditionImageIndex, 1);
    }
  };
  const handleAddLocationImage = (images: FileList) => {
    const imgBlobList: { image: string }[] = [];
    Array.from(images).map((img: File) => {
      const imgBlobUrl = URL.createObjectURL(img);
      imgBlobList.push({ image: imgBlobUrl });
      additionLocationImages.current.push({
        blobUrl: imgBlobUrl,
        file: img,
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
      additionAdsBoardImages.current.push({
        boardId: id,
        blobUrl: imgBlobUrl,
        file: imageFile,
      });
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

  return (
    <form onSubmit={handleSubmit(onSuccessSubmit, showReactHookFormError)}>
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
                render={({ field }) => (
                  <input
                    type="text"
                    id="address-ad-location"
                    placeholder="Example: 397 Williams ShoalSouth Warren"
                    {...field}
                    className="w-full h-full px-4 outline-none text-ellipsis text-xs"
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
                  onClick={() => handleDeleteLocationImage(img.image)}
                  className="absolute top-0 left-0 w-full h-full bg-black/60 grid place-items-center opacity-0 hover:opacity-100 transition-all"
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
                            className="relative w-fit h-fit"
                            onClick={() => {
                              const inputFile = document.getElementById(
                                `adsBoardImageInput@${ad.id}`
                              );
                              if (inputFile) {
                                inputFile.click();
                              }
                            }}
                          >
                            <Thumbnail
                              width={200}
                              height={200}
                              src={ad.image}
                            />
                            <span className="absolute top-0 left-0 w-full h-full bg-black/60 opacity-0 hover:opacity-100 grid place-items-center">
                              <span className="text-white text-[0.65rem]">
                                <i className="fi fi-sr-pen-field mr-2"></i>Chỉnh
                                sửa
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
                              onChange={(e) =>
                                handleChangeAdBoardImage(
                                  adsBoardWatch.find(
                                    (adBoard) =>
                                      adBoard.image === ad.image &&
                                      adBoard.expiredDate === ad.expiredDate &&
                                      adBoard.adsType === ad.adsType &&
                                      adBoard.height === ad.height &&
                                      adBoard.width === ad.width
                                  )?.id,
                                  e.target.files?.item(0) ?? null
                                )
                              }
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
                            {...register(`adsBoard.${index}.width`)}
                            className="border-solid border-[1px] border-zinc-400 px-3 py-2 mb-2 w-full col-start-2 row-start-1 col-span-1 row-span-1"
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
                            {...register(`adsBoard.${index}.height`)}
                            className="border-solid border-[1px] border-zinc-400 px-3 py-2 w-full col-start-2 row-start-2 col-span-1 row-span-1"
                          />
                        </span>,
                        <input
                          key={`adsType@${ad.id}`}
                          type="text"
                          id={`adsType@${ad.id}`}
                          defaultValue={ad.adsType}
                          placeholder="..."
                          {...register(`adsBoard.${index}.adsType`)}
                          className="border-solid border-[1px] border-zinc-400 px-3 py-2 w-auto col-start-2 row-start-2 col-span-1 row-span-1"
                        />,
                        <input
                          key={`expiredDate${ad.id}`}
                          type="datetime-local"
                          id={`expiredDate${ad.id}`}
                          defaultValue={ad.expiredDate}
                          onKeyDown={() => false}
                          {...register(`adsBoard.${index}.expiredDate`)}
                          className="border-solid border-[1px] border-zinc-400 px-3 py-2 w-auto col-start-2 row-start-2 col-span-1 row-span-1 text-xs font-normal"
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
        <button
          type="submit"
          className="px-8 py-2 rounded text-xs font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
        >
          Yêu cầu chỉnh sửa
        </button>
      </div>
    </form>
  );
}

export default EditAdDetail;
