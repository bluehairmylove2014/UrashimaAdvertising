'use client';
import { forwardRef } from 'react';
import CommonLoader from './CommonLoader';
import { mulSelectOptionType } from './MultipleLayerSelect';
type layerSelectProps = {
  selectedOption: string | null;
  onSelect: (option: string, index: number) => void;
  options: mulSelectOptionType;
};
const FirstLayerSelect = forwardRef<HTMLDivElement, layerSelectProps>(
  ({ selectedOption, onSelect, options }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute top-full right-0 z-30 w-full h-fit bg-white overflow-x-hidden hidden overflow-y-auto rounded-r-md shadow-md max-h-[21rem] min-w-[6rem] scrollbar-hide`}
      >
        {options ? (
          Object.keys(options).map((op, i) => (
            <button
              key={op}
              type="button"
              className={`${
                (i === 0 ? selectedOption === null : op === selectedOption)
                  ? 'bg-blue-100'
                  : 'bg-white'
              }  hover:bg-zinc-100 transition-colors w-full text-center py-3 px-2 text-[0.65rem]`}
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

export default FirstLayerSelect;
