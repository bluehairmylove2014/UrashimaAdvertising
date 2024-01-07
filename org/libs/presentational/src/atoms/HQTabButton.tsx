'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function HQTabButton({
  iconCls,
  name,
  href,
}: {
  iconCls: string;
  name: string;
  href: string;
}) {
  const pathName = usePathname();
  return (
    <li className="w-full mb-2">
      <Link
        href={href}
        className={`${
          pathName.startsWith(href)
            ? 'bg-rose-500 opacity-100 text-white'
            : 'bg-inherit opacity-70 text-black'
        } block w-full h-fit text-xs font-semibold rounded overflow-hidden px-4 py-3 hover:bg-rose-500 hover:scale-[1.05] hover:opacity-100 hover:text-white transition cursor-pointer`}
      >
        <i className={iconCls}></i>
        <span className="ml-2 select-none">{name}</span>
      </Link>
    </li>
  );
}

export default HQTabButton;
