'use client';
import { useUpload } from '@business-layer/business-logic/lib/sirv';
import CustomButton from '@presentational/atoms/CustomButton';
import ImageInput from '@presentational/atoms/ImageInput';
import ModernSelect, {
  modernSelectOptionType,
} from '@presentational/atoms/ModernSelect';
import { useNotification } from '@presentational/atoms/Notification';
import Switch from '@presentational/atoms/Switch';
import Thumbnail from '@presentational/atoms/Thumbnail';
import { renameImageWithUniqueName } from '@utils/helpers/imageName';
import {
  newLocationSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useViewLocationMap } from './ViewLocationMap';

const DEFAULT_THUMBNAIL_WIDTH = 120;
const DEFAULT_THUMBNAIL_HEIGHT = 120;

type newLocationType = {
  address: string;
  latitude: number;
  longitude: number;
  locationType: string;
  adsForm: string;
  planned: boolean;
  images: {
    image: string;
  }[];
};

function NewAdLocation({
  locationOptions,
  adsFormOptions,
}: {
  locationOptions: modernSelectOptionType[] | null;
  adsFormOptions: modernSelectOptionType[] | null;
}) {
  const router = useRouter();
  const editLocationResolver = useYupValidationResolver(newLocationSchema);
  const { enableSelecting, openMap } = useViewLocationMap();
  const { handleSubmit, getValues, setValue, control, watch, register } =
    useForm<newLocationType>({
      defaultValues: {
        address: '',
        locationType: '',
        adsForm: '',
        planned: true,
        images: [],
      },
      resolver: editLocationResolver,
    });
  const locationImagesWatch = watch('images');
  const isPlannedWatch = watch('planned');
  const { showError, showReactHookFormError, showSuccess } = useNotification();
  const additionLocationImages = useRef<{ blobUrl: string; file: File }[]>([]);
  const additionAdsBoardImages = useRef<
    { boardId: Number; blobUrl: string; file: File }[]
  >([]);
  // const { onModifyAdLocationDetail, isLoading } = useModifyAdLocationDetail();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { onUpload } = useUpload();

  // methods
  const onSuccessSubmit = (data: newLocationType) => {
    // UPLOAD TO CDN
    console.log(data);
    // onUploadImageToCDN().then((imgData) => {
    //   const modifyData: newLocationType = {
    //     ...data,
    //     images: data.images.map((fi) => {
    //       if (fi.image.includes('blob:')) {
    //         const suitableName = imgData?.locationImages?.find(
    //           (img) =>
    //             img.path.slice(img.path.lastIndexOf('/') + 1) ===
    //             additionLocationImages.current.find(
    //               (ai) => ai.blobUrl === fi.image
    //             )?.file.name
    //         );
    //         if (!suitableName) {
    //           showError('Lỗi thay đổi hình ảnh địa điểm');
    //           return fi;
    //         } else {
    //           return {
    //             image: suitableName.path,
    //           };
    //         }
    //       } else {
    //         return fi;
    //       }
    //     }),
    //   };
    // onModifyAdLocationDetail({
    //   ...modifyData,
    // })
    //   .then((msg) => {
    //     showSuccess(msg);
    //     router.push(
    //       customBackHref ??
    //         OFFICER_PAGES.AD_LOCATION_DETAIL + `/${adData.id}`
    //     );
    //   })
    //   .catch((error) => showError(error.message))
    //   .finally(() => {
    //     Object.keys(modifyData).forEach((key) =>
    //       setValue(
    //         key as keyof newLocationType,
    //         modifyData[key as keyof newLocationType]
    //       )
    //     );
    //     additionAdsBoardImages.current = [];
    //     additionLocationImages.current = [];
    //   });
    // });
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
              path: `/UrashimaAds Hub/locations/${getValues().address}`,
            })
          )
        );
      }
      if (additionAdsBoardImages.current.length > 0) {
        adsBoardImagesPathData = await Promise.all(
          Array.from(additionAdsBoardImages.current).map((img) =>
            onUpload({
              imgFile: img.file,
              path: `/UrashimaAds Hub/ads/${getValues().address}`,
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
  return (
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
                disabled={false}
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
                disabled={false}
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
                disabled={false}
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
                disabled={false}
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

          <div className="flex flex-row justify-start items-start mb-2 w-full">
            <h5 className="font-semibold text-sm whitespace-nowrap">
              <i className="fi fi-sr-earth-americas mr-2"></i>
              Vị trí địa lý:
            </h5>
            <div className="relative ml-[0.6rem] flex flex-col justify-start items-start gap-2 w-full">
              <input
                type="number"
                id="latitude"
                placeholder="Vĩ độ"
                {...register('latitude')}
                className="w-full h-8 outline-none rounded bg-transparent border border-solid border-zinc-400 px-3 text-xs"
              />
              <input
                type="number"
                id="longitude"
                placeholder="Kinh độ"
                {...register('longitude')}
                className="w-full h-8 outline-none rounded bg-transparent border border-solid border-zinc-400 px-3 text-xs"
              />
              <div className="w-full h-fit">
                <CustomButton
                  style="fill-green"
                  type="button"
                  onClick={() => {
                    enableSelecting();
                    openMap();
                  }}
                >
                  Chọn trên bản đồ
                </CustomButton>
              </div>
            </div>
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
                  disabled={false}
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
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-6 grid place-items-center">
        <div className="w-1/3 h-fit">
          <CustomButton style="fill-primary" loading={false} type="submit">
            Tạo điểm quảng cáo
          </CustomButton>
        </div>
      </div>
    </form>
  );
}

export default NewAdLocation;
