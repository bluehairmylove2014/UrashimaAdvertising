'use client';

import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import ReportInput from '@presentational/atoms/ReportInput';
import {
  useYupValidationResolver,
  userReportSchema,
} from '@utils/validators/yup';
import { useState } from 'react';
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

  const onSuccessSubmit = (data: any) => {
    if (!selectedReportType) {
      showError('Bạn chưa chọn kiểu báo cáo!');
      return;
    }

    const reportFuncAsync = getReportFunc(reportTarget);
    reportFuncAsync &&
      reportFuncAsync({
        ...data,
        ...reportAdditionData,
        reportType: selectedReportType,
      })
        .then((msg) => {
          showSuccess(msg);
          unActivateForm();
          reset();
        })
        .catch((error) => showError(error.message));
  };

  const onSelectReportType = (type: string) => {
    setSelectedReportType(type);
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
        />
        <ReportInput
          name={'email'}
          type="EMAIL"
          control={control}
          label="Email"
          formState={formState}
        />
        <ReportInput
          name={'phone'}
          type="PHONE_NUMBER"
          control={control}
          label="Điện thoại liên lạc"
          formState={formState}
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
              } transition-colors rounded-lg px-3 py-2 whitespace-nowrap`}
              type="button"
              onClick={() => onSelectReportType(r)}
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
        />
        <CustomButton
          style="fill-primary"
          type="submit"
          loading={isReportingAd || isReportingLocation}
        >
          Gửi báo cáo
        </CustomButton>
      </form>
    </div>
  );
}

export default ReportForm;
