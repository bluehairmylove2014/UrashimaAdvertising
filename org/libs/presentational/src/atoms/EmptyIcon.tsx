import Image from 'next/image';
import EmptyIconPNG from '@assets/empty-box.png';

const DEFAULT_ICON_SIZE = 80;

function EmptyIcon({ customSize }: { customSize?: number }) {
  const realSize = customSize ?? DEFAULT_ICON_SIZE;
  return (
    <div className="w-full h-full">
      <Image
        src={EmptyIconPNG}
        alt="empty"
        width={realSize}
        height={realSize}
        priority={false}
      />
    </div>
  );
}

export default EmptyIcon;
