'use client';

import { toggleClass } from '@utils/helpers';
import Link from 'next/link';
import { useRef } from 'react';

type officerNavDropdown = {
  children: React.ReactNode;
  position?: 'left' | 'center' | 'right';
  options: {
    name: string;
    href: string;
  }[];
};

const positionStyles = {
  left: 'right-0',
  center: 'left-1/2 transform -translate-x-1/2',
  right: 'left-0',
};

function OfficerNavDropdown({
  children,
  position,
  options,
}: officerNavDropdown) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <button
      className="relative text-xs text-white font-semibold hover:text-orange-400 transition-colors"
      onClick={() => toggleClass(dropdownRef.current, '!flex')}
    >
      {children}
      <i className="fi fi-sr-caret-down ml-1 -bottom-[1px]"></i>
      <div
        className={`flex-col h-fit hidden w-44 bg-white rounded absolute top-[140%] z-30 overflow-hidden shadow-md ${
          position ? positionStyles[position] : ''
        }`}
        ref={dropdownRef}
      >
        {options.map((op) => (
          <Link
            href={op.href}
            key={op.name}
            prefetch={true}
            className="bg-inherit hover:bg-zinc-300 transition-colors text-black w-full py-3 px-2"
          >
            {op.name}
          </Link>
        ))}
      </div>
    </button>
  );
}

export default OfficerNavDropdown;
