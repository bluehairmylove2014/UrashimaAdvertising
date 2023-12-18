'use client';

import { useState } from 'react';

function Switch({
  defaultValue,
  onChange,
}: {
  defaultValue?: boolean;
  onChange: (status: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(defaultValue ?? false);
  return (
    <button
      type="button"
      onClick={() => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange && onChange(newValue);
      }}
      className="grid place-items-center"
    >
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          className="sr-only peer hidden"
          onChange={(e) => {
            // todo
          }}
        />
        <span className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-12 h-6 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-0.5 after:left-0.5 after:-rotate-180 after:flex after:justify-center after:items-center text-xs peer-checked:after:translate-x-6 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></span>
      </label>
    </button>
  );
}

export default Switch;
