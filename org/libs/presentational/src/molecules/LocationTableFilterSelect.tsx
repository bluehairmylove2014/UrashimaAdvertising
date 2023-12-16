'use client';

import {
  useFilterAdLocationByAdForm,
  useFilterAdLocationByLocationType,
} from '@business-layer/business-logic/lib/officerAds/process/hooks';
import { toggleClass } from '@utils/helpers';
import { useRef, useState } from 'react';

type optionType = {
  name: string;
  value: null | string;
  defaultChecked: boolean;
};
type locationTableFilterSelectParamsType = {
  options: optionType[];
  type: 'adsForm' | 'locationType';
  defaultValue?: any;
};

function LocationTableFilterSelect({
  options,
  type,
  defaultValue,
}: locationTableFilterSelectParamsType) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    options.find((op) => op.defaultChecked)?.name || options[0].name
  );
  const selectRef = useRef<HTMLDivElement>(null);
  const { onSetAdForm } = useFilterAdLocationByAdForm();
  const { onSetLocationType } = useFilterAdLocationByLocationType();
  const toggleDropdown = () => toggleClass(selectRef.current, '!block');

  const handleFilter = (option: optionType) => {
    setSelectedOption(option.name);
    if (type === 'adsForm') {
      onSetAdForm(option.value);
    } else if (type === 'locationType') {
      onSetLocationType(option.value);
    }
  };

  return (
    <div className="relative border-solid border-[1px] border-zinc-400 bg-cyan-50 hover:bg-cyan-100 transition-colors text-black font-semibold rounded text-[0.65rem]">
      <button
        type="button"
        onClick={toggleDropdown}
        className="h-full flex flex-row items-center"
      >
        <span className="mr-2 ml-3 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis line-clamp-1">
          {selectedOption}
        </span>
        <div className="border-solid border-l-[1px] border-zinc-400 w-fit h-full bg-inherit grid place-items-center">
          <i className="fi fi-bs-angle-small-down px-2"></i>
        </div>
      </button>
      <div
        ref={selectRef}
        className="absolute top-full left-0 z-30 w-full h-fit bg-white overflow-hidden rounded-b-smshadow-md hidden"
      >
        {options.map((op) => (
          <button
            key={op.name}
            type="button"
            disabled={selectedOption === op.name}
            className="bg-white hover:bg-zinc-100 disabled:cursor-not-allowed disabled:bg-zinc-100 transition-colors w-full text-center py-3 px-2"
            onClick={() => {
              handleFilter(op);
              toggleDropdown();
            }}
          >
            {op.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LocationTableFilterSelect;
