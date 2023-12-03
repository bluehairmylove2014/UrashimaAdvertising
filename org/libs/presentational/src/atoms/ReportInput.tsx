import { addClass, removeClass } from '@utils/helpers';
import { loginSchema } from '@utils/validators/yup';
import { FocusEventHandler, useRef } from 'react';
import { Controller } from 'react-hook-form';

type authInputParams = {
  name: string;
  label: string;
  type: 'EMAIL' | 'PHONE_NUMBER' | 'TEXT' | 'LONG_TEXT';
  control: any;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const inputConfig = {
  EMAIL: { inputType: 'email', labelAdditionStyle: 'top-1/2' },
  PHONE_NUMBER: { inputType: 'text', labelAdditionStyle: 'top-1/2' },
  TEXT: { inputType: 'text', labelAdditionStyle: 'top-1/2' },
  LONG_TEXT: { inputType: null, labelAdditionStyle: 'top-4' },
};

function ReportInput({
  name,
  label,
  type,
  control,
  disabled,
  onChange,
}: authInputParams) {
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div className="relative flex flex-row justify-start items-center border-[1px] border-solid border-zinc-200 rounded overflow-hidden px-4 h-fit w-full mb-3">
      <label
        ref={labelRef}
        htmlFor={name}
        className={` opacity-60 ${inputConfig[type].labelAdditionStyle} absolute left-6 transform -translate-y-1/2 text-xs font-semibold whitespace-nowrap z-20 transition-opacity`}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          type === 'LONG_TEXT' ? (
            <textarea
              id={name}
              disabled={disabled}
              className="relative outline-none w-full h-20 z-10 bg-transparent px-2 py-1 resize-none text-xs"
              onFocus={(e) => {
                addClass(labelRef.current, '!opacity-0');
              }}
              {...field}
              onBlur={(e) => {
                if (e.target.value.trim().length === 0) {
                  removeClass(labelRef.current, '!opacity-0');
                }
              }}
              autoComplete="off"
            />
          ) : (
            <input
              type={inputConfig[type].inputType}
              id={name}
              disabled={disabled}
              className="relative outline-none w-full h-9 z-10 bg-transparent px-2 text-xs"
              onFocus={(e) => {
                addClass(labelRef.current, '!opacity-0');
              }}
              {...field}
              onBlur={(e) => {
                if (e.target.value.trim().length === 0) {
                  removeClass(labelRef.current, '!opacity-0');
                }
              }}
              autoComplete="off"
            />
          )
        }
      />
    </div>
  );
}

export default ReportInput;
