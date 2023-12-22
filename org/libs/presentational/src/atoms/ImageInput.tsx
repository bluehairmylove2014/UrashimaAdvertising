'use client';
import { useRef } from 'react';
import { useNotification } from './Notification';

const limitTotalSize = 10485760; // 10 MB
const MBConvertFactor = 1048576; // 1048576 KB = 1 MB

const styleList = {
  fill: 'w-fit h-full flex flex-col justify-center items-center',
  button: 'w-fit h-fit ',
};

function ImageInput({
  onSelectImages,
  style,
  limit,
  limitSize,
  isAbortLimitSize,
  disabled,
}: {
  onSelectImages: (imageList: FileList) => void;
  style?: 'fill' | 'button';
  limit?: number;
  limitSize?: number;
  isAbortLimitSize?: boolean;
  disabled?: boolean;
}) {
  const realLimitSize = limitSize ?? limitTotalSize;
  const selectedStyle = style || 'button';
  const inputRef = useRef<HTMLInputElement>(null);
  const { showError } = useNotification();

  const triggerInputFile = () => {
    inputRef.current && inputRef.current.click();
  };
  const handleUploadImage = (fileList: FileList | null) => {
    if (!fileList) {
      showError('Lỗi upload file!');
      return;
    }

    if (typeof limit === 'number' && limit > 0 && fileList.length > limit) {
      showError(`Chỉ được chọn TỐI ĐA ${limit} ảnh`);
      return;
    }

    const totalSize = Array.from(fileList).reduce(
      (acc, file) => acc + (file.size || 0),
      0
    );

    if (!isAbortLimitSize) {
      if (totalSize < realLimitSize) {
        onSelectImages && onSelectImages(fileList);
      } else {
        showError(
          `Kích thước tối đa ${(realLimitSize / MBConvertFactor).toFixed(0)}MB`
        );
      }
    } else {
      onSelectImages && onSelectImages(fileList);
    }
  };

  return (
    <>
      <button
        className={`${styleList[selectedStyle]} disabled:cursor-not-allowed disabled:opacity-50 rounded px-4 py-2 bg-cyan-100 border-solid border-2 border-blue-400 text-blue-500 text-[0.5rem] hover:border-blue-600 transition-colors`}
        type="button"
        onClick={triggerInputFile}
        disabled={disabled}
      >
        <i className="fi fi-br-picture inline-block"></i>
        <span className="ml-2">Thêm hình ảnh </span>
        {limit ? <span>(Tối đa {limit || 2})</span> : <></>}
      </button>{' '}
      <input
        type="file"
        name="imageInput"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        multiple={true}
        max={limit || 2}
        onChange={(e) => handleUploadImage(e.target.files)}
      />
    </>
  );
}

export default ImageInput;
