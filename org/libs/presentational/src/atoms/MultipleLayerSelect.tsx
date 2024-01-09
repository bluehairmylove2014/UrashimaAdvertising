import { addClass, removeClass, toggleClass } from '@utils/helpers';
import { useEffect, useRef, useState } from 'react';
import FirstLayerSelect from './FirstLayerSelect';
import SecondLayerSelect from './SecondLayerSelect';

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

  const renderLabel = () => {
    if (selectedOption) {
      if (selectedMulLayerOption) {
        return `${selectedMulLayerOption} | ${selectedOption}`;
      } else {
        return selectedOption;
      }
    } else {
      return label;
    }
  };

  const onFirstLayerSelect = (option: string, index: number) => {
    if (index > 0) {
      setSelectedOption(option);
      setSelectedMulLayerOption(null);
      onOptionSelect({
        district: option,
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
  };
  const onSecondLayerSelect = (option: string, index: number) => {
    if (index > 0) {
      setSelectedMulLayerOption(option);
      onOptionSelect({
        district: selectedOption,
        ward: option,
      });
    } else {
      setSelectedMulLayerOption(null);
      onOptionSelect({
        district: selectedOption,
        ward: null,
      });
    }
    toggleDropdown();
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
          {renderLabel()}
        </span>
        <div className="flex-shrink border-solid border-l-[1px] border-zinc-400 w-fit h-full bg-inherit grid place-items-center">
          <i className="fi fi-bs-angle-small-down px-2"></i>
        </div>
      </button>
      <FirstLayerSelect
        ref={selectRef}
        selectedOption={selectedOption}
        onSelect={onFirstLayerSelect}
        options={options}
      />
      <SecondLayerSelect
        ref={secondLayerRef}
        firstLayerSelectedOption={selectedOption}
        selectedOption={selectedMulLayerOption}
        onSelect={onSecondLayerSelect}
        options={options}
      />
    </div>
  );
}

export default MultipleLayerSelect;
