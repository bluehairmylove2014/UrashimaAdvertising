'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function OfficerMeNavLi({ label, href }: { label: string; href: string }) {
  const pathName = usePathname();
  return (
    <li
      className={`${
        href.includes(pathName) ? 'text-red-600' : 'text-black'
      } w-full py-1 hover:text-red-600 transition-colors text-sm text-center font-semibold rounded overflow-hidden`}
    >
      <Link href={href} className="whitespace-nowrap">
        {label}
      </Link>
    </li>
  );
}

export default OfficerMeNavLi;
