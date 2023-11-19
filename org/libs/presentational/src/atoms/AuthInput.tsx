'use client';
import { Controller } from 'react-hook-form';
import { useRef } from 'react';
import { addClass, removeClass } from '@utils/helpers';

const inputDefinition = {
  EMAIL: {
    type: 'email',
    icon: 'fi fi-rr-envelope',
  },
  PASSWORD: {
    type: 'password',
    icon: 'fi fi-rs-key',
  },
};

export type authInputParams = {
  name: string;
  label: string;
  type: 'EMAIL' | 'PASSWORD';
  control: any;
  disabled?: boolean;
  onChange?: (value: string) => void;
};
const AuthInput = ({
  name,
  label,
  type,
  control,
  disabled,
  onChange,
}: authInputParams) => {
  const labelSpanRef = useRef<HTMLSpanElement>(null);

  return (
    <div className="relative bg-zinc-100 rounded shadow-lg h-10 w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <label
              className="text-xs absolute top-1/2 left-5 -translate-y-1/2 font-semibold opacity-50 flex flex-row items-center justify-start"
              htmlFor={name}
            >
              <i className={`${inputDefinition[type].icon} pr-2`}></i>
              <span className="transition-opacity" ref={labelSpanRef}>
                {label}
              </span>
            </label>
            <input
              className="text-xs border-none outline-none bg-transparent px-10 w-full h-full"
              type={inputDefinition[type].type}
              id={name}
              disabled={disabled}
              autoComplete="off"
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value);
                onChange && onChange(value);
              }}
              onFocus={() => {
                addClass(labelSpanRef.current, 'opacity-0');
              }}
              onBlur={(e) => {
                if (e.target.value.trim().length === 0) {
                  removeClass(labelSpanRef.current, 'opacity-0');
                }
              }}
            />
          </>
        )}
      />
    </div>
  );
};

export default AuthInput;
