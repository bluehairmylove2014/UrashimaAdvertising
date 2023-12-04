'use client';

import Image from 'next/image';

type previewImageParams = { width: number; height: number; imgPreview: File };
function PreviewImage({ width, height, imgPreview }: previewImageParams) {
  return (
    <Image
      className="!object-cover"
      src={URL.createObjectURL(imgPreview)}
      width={width}
      height={height}
      alt="preview image"
    />
  );
}

export default PreviewImage;
