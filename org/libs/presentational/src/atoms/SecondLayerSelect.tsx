'use client';
import { forwardRef } from 'react';
import CommonLoader from './CommonLoader';
import { mulSelectOptionType } from './MultipleLayerSelect';
type layerSelectProps = {
  firstLayerSelectedOption: string | null;
  selectedOption: string | null;
  onSelect: (option: string, index: number) => void;
  options: mulSelectOptionType;
  maxHeight?: string;
};
const SecondLayerSelect = forwardRef<HTMLDivElement, layerSelectProps>(
  (
    { firstLayerSelectedOption, selectedOption, onSelect, options, maxHeight },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`absolute top-full right-[max(100%,6rem)] z-30 w-full h-fit bg-white overflow-x-hidden overflow-y-auto hidden rounded-l-md shadow-md ${
          maxHeight ? maxHeight : 'max-h-[21rem]'
        } min-w-[6rem] scrollbar-hide`}
      >
        {options && firstLayerSelectedOption ? (
          options[firstLayerSelectedOption].map((op, i) => (
            <button
              key={op}
              type="button"
              className={`${
                (i === 0 ? selectedOption === null : op === selectedOption)
                  ? '!bg-blue-100'
                  : ''
              } bg-white hover:bg-zinc-100 transition-colors w-full text-center py-3 px-2 text-[0.65rem] scrollbar-hide`}
              onClick={() => onSelect(op, i)}
            >
              {op}
            </button>
          ))
        ) : (
          <CommonLoader />
        )}
      </div>
    );
  }
);

export default SecondLayerSelect;
