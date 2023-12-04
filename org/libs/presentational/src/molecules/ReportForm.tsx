'use client';

import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import ReportInput from '@presentational/atoms/ReportInput';
import {
  useYupValidationResolver,
  userReportSchema,
} from '@utils/validators/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useReportAd,
  useReportLocation,
} from '@business-layer/business-logic/lib/report';
import {
  reportTargetType,
  reportAdditionDataType,
  useSetReportFormActive,
} from '@business-layer/business-logic/lib/reportForm';
import ImageInput from '@presentational/atoms/ImageInput';
import PreviewImage from '@presentational/atoms/PreviewImage';
import { useUpload } from '@business-layer/business-logic/lib/sirv';

const PREVIEW_HEIGHT = 80;

function ReportForm({
  isActive,
  reportTarget,
  reportAdditionData,
}: {
  isActive: boolean;
  reportTarget: reportTargetType;
  reportAdditionData: reportAdditionDataType;
}) {
  const { unActivateForm } = useSetReportFormActive();
  const formResolver = useYupValidationResolver(userReportSchema);
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      content: '',
    },
    resolver: formResolver,
  });
  const { showReactHookFormError, showError, showSuccess } = useNotification();
  const reportsType = [
    'Tố giác sai phạm',
    'Đăng ký nội dung',
    'Đóng góp ý kiến',
    'Giải đáp thắc mắc',
  ];
  const [selectedReportType, setSelectedReportType] = useState<string | null>(
    null
  );
  const { onReportAd, isLoading: isReportingAd } = useReportAd();
  const { onReportLocation, isLoading: isReportingLocation } =
    useReportLocation();
  const [imagesPreview, setImagesPreview] = useState<FileList | null>(null);
  const { onUpload } = useUpload();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Methods
  const getReportFunc = (target: reportTargetType) => {
    switch (target) {
      case 'AD':
        return onReportAd;
      case 'LOCATION':
        return onReportLocation;
      default:
        return undefined;
    }
  };

  const handleReport = (data: any) => {
    // SEND REPORT FORM TO SERVER
    const reportFuncAsync = getReportFunc(reportTarget);
    reportFuncAsync &&
      reportFuncAsync(data)
        .then((msg) => {
          showSuccess(msg);
          // Hide Form
          unActivateForm();
          // Reset form
          reset();
          setImagesPreview(null);
          setSelectedReportType(null);
        })
        .catch((error) => showError(error.message));
  };

  const onSuccessSubmit = (data: any) => {
    if (!selectedReportType) {
      showError('Bạn chưa chọn kiểu báo cáo!');
      return;
    }
    // UPLOAD TO CDN
    setIsUploading(true);
    if (imagesPreview) {
      const uploadPromises = Array.from(imagesPreview).map((img) =>
        onUpload({ imgFile: img })
      );
      Promise.all(uploadPromises)
        .then((data) => {
          handleReport({
            ...data,
            ...reportAdditionData,
            images: data.map((d) => ({ image: d.path })),
            reportType: selectedReportType,
          });
        })
        .catch((error) => {
          showError(error.message);
        })
        .finally(() => {
          setIsUploading(false);
        });
    } else {
      handleReport({
        ...data,
        ...reportAdditionData,
        images: [],
        reportType: selectedReportType,
      });
    }
  };

  const onSelectReportType = (type: string) => {
    setSelectedReportType(type);
  };

  const handleSelectImage = (imageList: FileList) => {
    setImagesPreview(imageList);
  };

  return (
    <div
      className={`${
        isActive ? 'block' : 'hidden'
      } fixed w-screen h-screen top-0 left-0 bg-black/60 p-6 rounded-md z-30 grid place-items-center`}
    >
      <form
        onSubmit={handleSubmit(onSuccessSubmit, showReactHookFormError)}
        className={`w-1/2 h-fit bg-white p-6 rounded-md`}
        noValidate
      >
        <div className="flex flex-row justify-between text-center mb-3">
          <div></div>
          <h3>BÁO CÁO</h3>
          <button
            type="button"
            onClick={() => {
              unActivateForm();
            }}
            disabled={isReportingAd || isReportingLocation || isUploading}
          >
            x
          </button>
        </div>

        <ReportInput
          name={'name'}
          type="TEXT"
          control={control}
          label="Họ tên"
          formState={formState}
          disabled={isReportingAd || isReportingLocation || isUploading}
        />
        <ReportInput
          name={'email'}
          type="EMAIL"
          control={control}
          label="Email"
          formState={formState}
          disabled={isReportingAd || isReportingLocation || isUploading}
        />
        <ReportInput
          name={'phone'}
          type="PHONE_NUMBER"
          control={control}
          label="Điện thoại liên lạc"
          formState={formState}
          disabled={isReportingAd || isReportingLocation || isUploading}
        />
        <div className=" w-full flex flex-row justify-start items-center gap-2 flex-wrap my-3">
          <p className="text-xs font-semibold whitespace-nowrap select-none">
            Hình thức báo cáo:{' '}
          </p>
          {reportsType.map((r) => (
            <button
              key={r}
              className={`text-[0.6rem] font-medium ${
                selectedReportType === r
                  ? 'bg-cyan-400'
                  : 'bg-cyan-100 hover:bg-cyan-200'
              } transition-colors rounded-lg px-3 py-2 whitespace-nowrap disabled:cursor-not-allowed`}
              type="button"
              onClick={() => onSelectReportType(r)}
              disabled={isReportingAd || isReportingLocation || isUploading}
            >
              {r}
            </button>
          ))}
        </div>
        <ReportInput
          name={'content'}
          type="LONG_TEXT"
          control={control}
          label="Nội dung báo cáo"
          formState={formState}
          disabled={isReportingAd || isReportingLocation || isUploading}
        />
        <div className="my-3">
          {imagesPreview ? (
            <div
              className="flex flex-row gap-2 justify-start items-center"
              style={{ height: `${PREVIEW_HEIGHT}px` }}
            >
              {Array.from(imagesPreview).map((img, index) => (
                <div key={img.name + index}>
                  <PreviewImage
                    width={PREVIEW_HEIGHT}
                    height={PREVIEW_HEIGHT}
                    imgPreview={img}
                  />
                </div>
              ))}
              <button
                type="button"
                className=" ml-2 text-xs text-red-600 hover:text-red-800 transition-colors"
                onClick={() => setImagesPreview(null)}
                disabled={isReportingAd || isReportingLocation || isUploading}
              >
                <i className="fi fi-sr-trash-xmark"></i>
              </button>
            </div>
          ) : (
            <ImageInput onSelectImages={handleSelectImage} />
          )}
        </div>
        <CustomButton
          style="fill-primary"
          type="submit"
          loading={isReportingAd || isReportingLocation || isUploading}
        >
          Gửi báo cáo
        </CustomButton>
      </form>
    </div>
  );
}

export default ReportForm;
