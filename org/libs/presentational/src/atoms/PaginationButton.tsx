'use client';

const buttonUniqueStyles = {
  number:
    'px-4 py-2 font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0 focus:z-20 text-gray-900 hover:bg-gray-50',
  activeNumber:
    'relative z-10 px-4 py-2 font-semibold focus:z-20 inline-flex items-center bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  threeDot:
    'px-4 py-2 font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0',
  prev: 'rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed',
  next: 'rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed',
};

export type paginationButtonType =
  | 'number'
  | 'prev'
  | 'next'
  | 'activeNumber'
  | 'threeDot';

type paginationButtonParamsType = {
  onClick: () => void;
  children: React.ReactNode;
  isDisabled?: boolean;
  type: paginationButtonType;
};
function PaginationButton({
  onClick,
  children,
  isDisabled,
  type,
}: paginationButtonParamsType) {
  return (
    <button
      className={`relative inline-flex items-center text-xs ${buttonUniqueStyles[type]}`}
      onClick={() => onClick && onClick()}
      disabled={isDisabled || type === 'threeDot'}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
