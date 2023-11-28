'use client';
import ButtonLoader from './ButtonLoader';

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
      return {
        normal: 'bg-blue-500 hover:bg-blue-700 transition-colors',
        disabled: 'bg-cyan-500 cursor-not-allowed',
        common: 'rounded text-white',
      };
    case 'fill-secondary':
      return {
        normal: 'bg-gray-100 rounded hover:bg-gray-300 transition-colors',
        disabled: 'bg-gray-300 cursor-not-allowed',
        common: 'rounded text-white',
      };
    default:
      return {
        normal: '',
        disabled: '',
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
}: commonButtonType): JSX.Element {
  const {
    normal: normalStyle,
    disabled: disabledStyle,
    common: commonStyle,
  } = getTailwindClassStyle(style);

  return (
    <button
      className={`${commonStyle} shadow-sm w-full py-2 font-semibold text-xs ${loading ? disabledStyle : normalStyle
        }`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type ?? defaultType}
    >
      {loading ? <ButtonLoader label="Signing in..." /> : <>{children}</>}
    </button>
  );
}

export default CustomButton;
