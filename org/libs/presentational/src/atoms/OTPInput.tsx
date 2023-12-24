'use client';

import React, { useEffect, useRef, useState } from 'react';

type otpInputType = {
  onChange: (otp: string[]) => void;
  disabled: boolean;
  otpLength: number;
};

const DEFAULT_OTP_INPUT_FOCUS_INDEX = 0;

function OTPInput({ onChange, disabled, otpLength }: otpInputType) {
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));
  const [currentOtpIndex, setCurrentOtpIndex] = useState<number>(
    DEFAULT_OTP_INPUT_FOCUS_INDEX
  );
  const otpInputRef = useRef<(HTMLInputElement | null)[]>([]);

  // Methods
  const handleAddOtp = (value: string) => {
    if (currentOtpIndex < otpLength && otp[currentOtpIndex] === '') {
      const newOtp = [...otp];
      newOtp[currentOtpIndex] = value;
      setOtp(newOtp);
      currentOtpIndex < otpLength - 1 &&
        setCurrentOtpIndex(currentOtpIndex + 1);
    }
  };

  const handleDeleteOtp = () => {
    const newOtp = [...otp];
    newOtp[currentOtpIndex] = '';
    setOtp(newOtp);
    currentOtpIndex > 0 && setCurrentOtpIndex(currentOtpIndex - 1);
  };

  const handleOtpInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value.trim();
    value.length > 0 ? handleAddOtp(value) : handleDeleteOtp();
  };

  const handleKeyDown = ({
    key,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Backspace' && currentTarget.value.trim().length === 0) {
      handleDeleteOtp();
    }
  };

  // Effect
  useEffect(() => {
    onChange(otp);
  }, [otp]);
  useEffect(() => {
    otpInputRef.current && otpInputRef.current[currentOtpIndex]?.focus();
  }, [currentOtpIndex]);

  return (
    <>
      <div className="flex flex-row justify-evenly items-center relative w-full h-5">
        {otp.map((_, i) => (
          <div
            className="bg-cyan-50 rounded overflow-hidden w-8 h-10 border-solid border border-zinc-400"
            key={`otpInput@${i}`}
          >
            <input
              type="tel"
              ref={(e) => (otpInputRef.current[i] = e)}
              maxLength={1}
              disabled={disabled}
              autoComplete="off"
              onChange={(e) => handleOtpInputChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="outline-none border-none bg-transparent w-full h-full text-center"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default OTPInput;
