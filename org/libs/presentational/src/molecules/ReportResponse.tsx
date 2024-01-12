import CustomButton from '@presentational/atoms/CustomButton';
import { useNotification } from '@presentational/atoms/Notification';
import MessageImage from '@assets/message.png';
import Image from 'next/image';
import {
  responseInputSchema,
  useYupValidationResolver,
} from '@utils/validators/yup';
import { Controller, useForm } from 'react-hook-form';
import { IOfficerReportDetail } from '@business-layer/services/entities';
import { useOfficerEditReport } from '../../../business-layer/src/business-logic/lib/officerReport/process/hooks/useOfficerEditReport';
import { boolean } from 'zod';
import { useEffect, useState } from 'react';

type formData = {
  response: string;
};

function ReportResponse({
  reportData,
  handleClose,
}: {
  reportData: IOfficerReportDetail;
  handleClose: () => void;
}) {
  const reasonsInputResolver = useYupValidationResolver(responseInputSchema);
  const { showError, showReactHookFormError, showSuccess } = useNotification();
  const { control, handleSubmit, reset, watch, register } = useForm({
    defaultValues: {
      response: '',
    },
    resolver: reasonsInputResolver,
  });
  const { onOfficerEditReport, isLoading } = useOfficerEditReport();

  const onModify = (formData: formData) => {
    reportData.treatmentProcess = formData.response;
    console.log(reportData);
    onOfficerEditReport({
      ...reportData,
    })
      .then((msg) => {
        showSuccess(msg);
        reset();
      })
      .catch((error) => showError(error.message))
      .finally(() => { });
  };

  useEffect(() => {
    console.log(reportData);

  }, [])
  const responseWatch = watch('response');

  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black/60 p-6 rounded-md z-30 grid place-items-center">
      <form
        onSubmit={handleSubmit(onModify, showReactHookFormError)}
        noValidate
        className="bg-white rounded overflow-hidden p-6 w-1/2 h-fit"
      >
        <div className="text-center font-bold text-2lg gap-3">
          <p>XỬ LÝ BÁO CÁO</p>
        </div>

        <div className="w-full h-40 border-solid border-[1px] border-zinc-400 mt-4">
          <textarea
            placeholder="Nhập xử lý vào đây..."
            className="resize-none w-full h-full outline-none bg-transparent border-none p-3 text-xs"
            {...register('response')}
          />
        </div>
        <div className="flex flex-row justify-end mt-2">
          <small
            className={`${responseWatch.length > 1000 ? 'text-red-600' : 'text-black'
              }`}
          >
            {responseWatch.length} / 1000
          </small>
        </div>

        <div className="w-full flex flex-row justify-center items-center gap-4 mt-4">
          <CustomButton
            style="fill-secondary"
            type="button"
            onClick={() => {
              handleClose();
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

export default ReportResponse;
