import Image from 'next/image';

type customImageParams = {
  src: string;
  alt: string;
  width: string;
  height: string;
  blurDataURL?: string;
  placeholder?: 'empty' | 'blur';
  isPriority?: boolean;
  quality?: number;
  loading?: 'eager' | 'lazy';
};
function CustomImage({
  src,
  alt,
  width,
  height,
  blurDataURL,
  placeholder,
  isPriority,
  quality = 100,
  loading,
}: customImageParams): JSX.Element {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ width, height }}
    >
      <Image
        className="object-cover"
        src={src}
        alt={alt}
        fill
        priority={isPriority}
        blurDataURL={blurDataURL}
        placeholder={placeholder}
        quality={quality}
        loading={loading}
        // onError={() => console.error(`Cannot load image src: '${src}'`)}
      />
    </div>
  );
}

export default CustomImage;
