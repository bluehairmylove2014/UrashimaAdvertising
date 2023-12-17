import Image from 'next/image';
import EmptyIconPNG from '@assets/empty-box.png';

const DEFAULT_ICON_SIZE = 80;

function EmptyIcon({
  customSize,
  label,
}: {
  customSize?: number;
  label?: string;
}) {
  const realSize = customSize ?? DEFAULT_ICON_SIZE;
  return (
    <div className="w-full h-full grid place-items-center">
      <Image
        src={EmptyIconPNG}
        alt="empty"
        width={realSize}
        height={realSize}
        priority={false}
      />
      <p className="mt-2 font-semibold text-xs opacity-60">{label}</p>
    </div>
  );
}

export default EmptyIcon;
