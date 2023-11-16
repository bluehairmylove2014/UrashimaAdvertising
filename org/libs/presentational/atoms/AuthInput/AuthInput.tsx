'use client';
import { Controller } from 'react-hook-form';
import './styles.scss';
import { useRef } from 'react';
import { toggleClass } from '@utils/helpers';
import { AUTH_INPUT_RULES } from '@constants/rules';

export type authInputParams = {
  name: string;
  label: string;
  type: 'EMAIL' | 'PASSWORD' | 'PHONE_NUMBER' | 'FULL_NAME';
  control: any;
  placeHolders: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};
const AuthInput = ({
  name,
  label,
  type,
  control,
  placeHolders,
  disabled,
  onChange,
}: authInputParams) => {
  const authInputRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="auth-input"
      style={{ height: `${label.trim().length === 0 ? 40 : 60}px` }}
      ref={authInputRef}
    >
      <Controller
        name={name}
        control={control}
        rules={AUTH_INPUT_RULES[type].validationRules}
        render={({ field }) => (
          <>
            <label htmlFor={name}>{label}</label>
            <div className="input-wrapper">
              <input
                type={AUTH_INPUT_RULES[type].inputType}
                id={name}
                placeholder={placeHolders}
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  onChange && onChange(value);
                }}
                autoComplete="off"
                onFocus={() =>
                  authInputRef.current &&
                  toggleClass(authInputRef.current, 'active')
                }
              />
            </div>
          </>
        )}
      />
    </div>
  );
};

export default AuthInput;
