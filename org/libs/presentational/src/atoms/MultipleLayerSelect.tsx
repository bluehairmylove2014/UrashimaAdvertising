import {
  addClass,
  removeClass,
  toggleClass,
  toggleClassNoListener,
} from '@utils/helpers';
import { useEffect, useRef, useState } from 'react';
import CommonLoader from './CommonLoader';

export type mulSelectOptionType = { [key: string]: string[] } | null;
type modernSelectUniqueStyle = 'clean' | 'softCyan';

const DEFAULT_STYLE: modernSelectUniqueStyle = 'softCyan';

const styleConfig = {
  clean: 'bg-transparent',
  softCyan: 'bg-cyan-50 hover:bg-cyan-100',
};

function MultipleLayerSelect({
  onOptionSelect,
  label,
  options,
  style,
  disabled,
}: {
  onOptionSelect: (value: {
    district: string | null;
    ward: string | null;
  }) => void;
  label: string;
  options: mulSelectOptionType | null;
  style?: modernSelectUniqueStyle;
  disabled?: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedMulLayerOption, setSelectedMulLayerOption] = useState<
    string | null
  >(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const secondLayerRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    toggleClass(selectRef.current, '!block');
  };
  const openMulLayerDropdown = () => {
    addClass(secondLayerRef.current, '!block');
  };
  const closeMulLayerDropdown = () => {
    removeClass(secondLayerRef.current, '!block');
  };

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      // Handle class changes here
      mutationsList.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          selectRef.current
        ) {
          !selectRef.current.classList.contains('block') &&
            closeMulLayerDropdown();
        }
      });
    });

    // Start observing the target node (myDivRef.current) for attribute changes
    selectRef.current &&
      observer.observe(selectRef.current, { attributes: true });

    // Cleanup the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`${
        styleConfig[style ?? DEFAULT_STYLE]
      } h-full relative border-solid border-[1px] border-zinc-400 transition-colors text-black font-semibold rounded text-[0.65rem]`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={toggleDropdown}
        className="h-full flex flex-row items-center text-[0.65rem] min-w-[10rem] disabled:cursor-not-allowed disabled:bg-zinc-100"
      >
        <span className="flex-grow mr-2 ml-3 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis line-clamp-1">
          {selectedMulLayerOption
            ? `${selectedMulLayerOption} | ${selectedOption}`
            : label}
        </span>
        <div className="flex-shrink border-solid border-l-[1px] border-zinc-400 w-fit h-full bg-inherit grid place-items-center">
          <i className="fi fi-bs-angle-small-down px-2"></i>
        </div>
      </button>
      <div
        ref={selectRef}
        className={`absolute top-full left-0 z-30 w-full h-fit bg-white overflow-x-hidden hidden overflow-y-auto rounded-b-sm shadow-md max-h-[21rem]`}
      >
        {options ? (
          Object.keys(options).map((op, i) => (
            <button
              key={op}
              type="button"
              disabled={
                i === 0 ? selectedOption === null : op === selectedOption
              }
              className="bg-white hover:bg-zinc-100 disabled:cursor-not-allowed disabled:bg-blue-100 transition-colors w-full text-center py-3 px-2 text-[0.65rem]"
              onClick={() => {
                if (i > 0) {
                  setSelectedOption(op);
                  setSelectedMulLayerOption(null);
                  onOptionSelect({
                    district: op,
                    ward: null,
                  });
                  openMulLayerDropdown();
                } else {
                  setSelectedOption(null);
                  setSelectedMulLayerOption(null);
                  onOptionSelect({
                    district: null,
                    ward: null,
                  });
                  toggleDropdown();
                }
              }}
            >
              {op}
            </button>
          ))
        ) : (
          <CommonLoader />
        )}
      </div>
      <div
        ref={secondLayerRef}
        className={`absolute top-full right-full z-30 w-full h-fit bg-white overflow-x-hidden overflow-y-auto hidden rounded-b-sm shadow-md max-h-[21rem]`}
      >
        {options && selectedOption ? (
          options[selectedOption].map((op, i) => (
            <button
              key={op}
              type="button"
              className={`${
                (
                  i === 0
                    ? selectedMulLayerOption === null
                    : op === selectedMulLayerOption
                )
                  ? '!bg-blue-100'
                  : ''
              } bg-white hover:bg-zinc-100 transition-colors w-full text-center py-3 px-2 text-[0.65rem] scrollbar-hide`}
              onClick={() => {
                if (i > 0) {
                  setSelectedMulLayerOption(op);
                  onOptionSelect({
                    district: selectedOption,
                    ward: op,
                  });
                } else {
                  setSelectedMulLayerOption(null);
                  onOptionSelect({
                    district: selectedOption,
                    ward: null,
                  });
                }
                toggleDropdown();
              }}
            >
              {op}
            </button>
          ))
        ) : (
          <CommonLoader />
        )}
      </div>
    </div>
  );
}

export default MultipleLayerSelect;
