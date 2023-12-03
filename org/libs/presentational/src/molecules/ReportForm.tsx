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

function ReportForm() {
  const formResolver = useYupValidationResolver(userReportSchema);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      content: '',
    },
    resolver: formResolver,
  });
  const { showReactHookFormError } = useNotification();
  const reportsType = [
    'Tố giác sai phạm',
    'Đăng ký nội dung',
    'Đóng góp ý kiến',
    'Giải đáp thắc mắc',
  ];
  const [selectedReportType, setSelectedReportType] = useState<string>(
    reportsType[0]
  );

  const onSuccessSubmit = (data: any) => {
    console.log(data);
  };

  const onSelectReportType = (type: string) => {
    setSelectedReportType(type);
  };

  return (
    <form
      onSubmit={handleSubmit(onSuccessSubmit, showReactHookFormError)}
      className=" fixed w-1/2 h-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md z-30"
      noValidate
    >
      <h3 className=" text-center mb-3">BÁO CÁO</h3>
      <ReportInput name={'name'} type="TEXT" control={control} label="Họ tên" />
      <ReportInput
        name={'email'}
        type="EMAIL"
        control={control}
        label="Email"
      />
      <ReportInput
        name={'phone'}
        type="PHONE_NUMBER"
        control={control}
        label="Điện thoại liên lạc"
      />
      <div className=" w-full flex flex-row justify-start items-center gap-2 flex-wrap my-3">
        <p className="text-xs font-semibold whitespace-nowrap select-none">
          Hình thức báo cáo:{' '}
        </p>
        {reportsType.map((r) => (
          <button
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
      />
      <CustomButton style="fill-primary" type="submit">
        Gửi báo cáo
      </CustomButton>
    </form>
  );
}

export default ReportForm;
