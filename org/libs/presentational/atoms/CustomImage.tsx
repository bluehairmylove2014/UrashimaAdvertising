import Image from 'next/image';
import React from 'react';

type customImageParams = {
  src: string;
  alt: string;
  width: string;
  height: string;
  externalClassName?: string;
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
  externalClassName,
  blurDataURL,
  placeholder,
  isPriority,
  quality,
  loading,
}: customImageParams) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${externalClassName}`}
      style={{ width, height }}
    >
      <Image
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
