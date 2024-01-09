import { toggleClass } from '@utils/helpers';
import { useRef, useState } from 'react';
import CommonLoader from './CommonLoader';

type modernSelectOptionValueType = null | string;
export type modernSelectOptionType = {
  name: string;
  value: modernSelectOptionValueType;
  defaultChecked: boolean;
};
type modernSelectUniqueStyle = 'clean' | 'softCyan';

const DEFAULT_STYLE: modernSelectUniqueStyle = 'softCyan';

const styleConfig = {
  clean: 'bg-transparent',
  softCyan: 'bg-cyan-50 hover:bg-cyan-100',
};

function ModernSelect({
  onOptionSelect,
  options,
  style,
  defaultValue,
  disabled,
}: {
  onOptionSelect: (value: modernSelectOptionType) => void;
  options: modernSelectOptionType[] | null;
  style?: modernSelectUniqueStyle;
  defaultValue?: modernSelectOptionValueType;
  disabled?: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultValue ||
      (Array.isArray(options)
        ? options.find((op) => op.defaultChecked)?.name || options[0].name
        : null)
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    toggleClass(selectRef.current, '!block');
  };
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
          {selectedOption}
        </span>
        <div className="flex-shrink border-solid border-l-[1px] border-zinc-400 w-fit h-full bg-inherit grid place-items-center">
          <i className="fi fi-bs-angle-small-down px-2"></i>
        </div>
      </button>
      <div
        ref={selectRef}
        className={`absolute top-full left-0 z-30 w-full h-fit bg-white overflow-hidden rounded-b-sm shadow-md hidden`}
      >
        {options ? (
          options.map((op) => (
            <button
              key={op.name}
              type="button"
              disabled={selectedOption === op.name}
              className="bg-white hover:bg-zinc-100 disabled:cursor-not-allowed disabled:bg-zinc-100 transition-colors w-full text-center py-3 px-2 text-[0.65rem]"
              onClick={() => {
                onOptionSelect && onOptionSelect(op);
                setSelectedOption(op.name);
                toggleDropdown();
              }}
            >
              {op.name}
            </button>
          ))
        ) : (
          <CommonLoader />
        )}
      </div>
    </div>
  );
}

export default ModernSelect;
