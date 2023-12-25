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
  const handleOtpInputChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = target.value.trim();
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value.length > 0 && currentOtpIndex + 1 < otpLength) {
      setCurrentOtpIndex(currentOtpIndex + 1);
    } else if (value.length == 0 && currentOtpIndex > 0) {
      setCurrentOtpIndex(currentOtpIndex - 1);
    }
  };

  // Effect
  useEffect(() => {
    console.log(otp);
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
              disabled={disabled || currentOtpIndex !== i}
              autoComplete="off"
              onChange={(e) => handleOtpInputChange(e, i)}
              className="outline-none border-none bg-transparent w-full h-full text-center disabled:bg-zinc-100 disabled:cursor-not-allowed"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default OTPInput;
