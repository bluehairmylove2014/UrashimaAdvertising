'use client';

import Image from 'next/image';

type thumbnailParams = { width: number; height: number; src: string };
function Thumbnail({ width, height, src }: thumbnailParams) {
  return (
    <Image
      className="!object-cover"
      src={src}
      width={width}
      height={height}
      alt="preview image"
    />
  );
}

export default Thumbnail;
