'use client';
// import ButtonLoader from "../ButtonLoader/ButtonLoader";
import React from 'react';

type buttonType = 'button' | 'submit';
type buttonStyle =
  | 'fill-primary' // blue background, white color
  | 'fill-secondary'; // gray background, black color
type commonButtonType = {
  children: React.ReactNode | string | number;
  style: buttonStyle;
  disabled?: boolean;
  type?: buttonType;
  loading?: boolean;
  onClick?: (arg0: any) => void;
};

const defaultType = 'button';

function getTailwindClassStyle(style: buttonStyle) {
  switch (style) {
    case 'fill-primary':
      return 'bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors';
    case 'fill-secondary':
      return '';
    default:
      return '';
  }
}

function CustomButton({
  children,
  style,
  disabled,
  loading,
  type,
  onClick,
}: commonButtonType): JSX.Element {
  const stylesToTailwindClass = getTailwindClassStyle(style);

  return (
    <button
      className={`${stylesToTailwindClass} shadow-sm w-full py-2 font-semibold text-xs `}
      onClick={onClick}
      disabled={disabled || loading}
      type={type || defaultType}
    >
      {/* <div className="loader">{loading ? <ButtonLoader /> : <></>}</div> */}
      {children}
    </button>
  );
}

export default CustomButton;
