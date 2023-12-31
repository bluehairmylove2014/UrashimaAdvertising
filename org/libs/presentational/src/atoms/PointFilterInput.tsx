import { useState } from 'react';

export type pointFilterInputProps = {
  layerIds: string[];
  dotColor: 'red' | 'blue' | 'orange' | 'none';
  dotInnerSymbol?: string;
  label: string;
  defaultChecked?: boolean;
  onChange: (layerId: string[], value: boolean) => void;
};

const colorList = {
  red: 'bg-red-600',
  orange: 'bg-orange-600',
  blue: 'bg-blue-600',
  none: 'bg-white',
};

function PointFilterInput({
  layerIds,
  dotColor = 'none',
  dotInnerSymbol = '',
  label = '',
  defaultChecked = false,
  onChange,
}: pointFilterInputProps) {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);
  return (
    <button
      onClick={() => {
        const val = !isChecked;
        setIsChecked(val);
        onChange && onChange(layerIds, val);
      }}
      className="flex flex-row justify-start items-center gap-2"
    >
      <div
        className={`${
          isChecked ? 'bg-cyan-100 border-cyan-100' : 'border-zinc-400'
        } w-4 h-4 rounded border border-solid  grid place-items-center cursor-pointer relative`}
      >
        <div
          style={{ display: isChecked ? 'block' : 'none' }}
          className="text-green-700 text-sm bg-transparent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          &#x2714;
        </div>
      </div>
      {dotColor !== 'none' ? (
        <div
          className={`rounded-full w-3 h-3 overflow-hidden ${colorList[dotColor]} text-white text-[0.55rem] font-extrabold relative`}
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {dotInnerSymbol}
          </span>
        </div>
      ) : (
        <></>
      )}

      <p
        className={`text-xs text-black ${
          isChecked ? 'font-semibold' : 'font-medium'
        }`}
      >
        {label}
      </p>
    </button>
  );
}

export default PointFilterInput;
