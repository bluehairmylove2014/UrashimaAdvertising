'use client';
import ButtonLoader from './ButtonLoader';

type buttonType = 'button' | 'submit';
type buttonStyle =
  | 'fill-primary' // blue background, white color
  | 'fill-secondary' // gray background, black color
  | 'fill-error' // red bg, white color
  | 'fill-green';
type commonButtonType = {
  children: React.ReactNode | string | number;
  style: buttonStyle;
  disabled?: boolean;
  type?: buttonType;
  loading?: boolean;
  onClick?: (arg0: any) => void;
  isShortLoading?: boolean;
};

const defaultType = 'button';

function getTailwindClassStyle(style: buttonStyle) {
  switch (style) {
    case 'fill-primary':
      return {
        normal: 'bg-blue-500 hover:bg-blue-700 transition-colors',
        disabled: 'disabled:bg-cyan-500 disabled:cursor-not-allowed',
        common: 'rounded text-white',
      };
    case 'fill-secondary':
      return {
        normal: 'bg-gray-100 rounded hover:bg-gray-300 transition-colors',
        disabled: 'disabled:bg-gray-300 disabled:cursor-not-allowed',
        common: 'rounded text-black',
      };
    case 'fill-green':
      return {
        normal: 'bg-green-600 rounded hover:bg-green-500 transition-colors',
        disabled: 'disabled:bg-gray-300 disabled:cursor-not-allowed',
        common: 'rounded text-white',
      };
    case 'fill-error':
      return {
        normal: 'bg-rose-600 rounded hover:bg-gray-500 transition-colors',
        disabled: 'disabled:bg-gray-300 disabled:cursor-not-allowed',
        common: 'rounded text-white',
      };
    default:
      return {
        normal: '',
        disabled: 'disabled:bg-gray-300 disabled:cursor-not-allowed',
        common: '',
      };
  }
}

function CustomButton({
  children,
  style,
  disabled,
  loading,
  type,
  onClick,
  isShortLoading,
}: commonButtonType): JSX.Element {
  const {
    normal: normalStyle,
    disabled: disabledStyle,
    common: commonStyle,
  } = getTailwindClassStyle(style);

  return (
    <button
      className={`${commonStyle} ${disabledStyle} ${normalStyle} shadow-sm w-full py-2 font-semibold text-xs`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type ?? defaultType}
    >
      {loading ? (
        <ButtonLoader label={isShortLoading ? '' : 'Chờ chút...'} />
      ) : (
        <>{children}</>
      )}
    </button>
  );
}

export default CustomButton;
