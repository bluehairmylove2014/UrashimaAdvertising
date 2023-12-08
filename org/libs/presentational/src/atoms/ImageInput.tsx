'use client';
import { useRef } from 'react';
import { useNotification } from './Notification';

const limitTotalSize = 10485760; // 10MB

function ImageInput({
  onSelectImages,
}: {
  onSelectImages: (imageList: FileList) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useNotification();

  const triggerInputFile = () => {
    inputRef.current && inputRef.current.click();
  };
  const handleUploadImage = (fileList: FileList | null) => {
    if (!fileList) {
      showError('Lỗi upload file!');
      return;
    }

    if (fileList.length > 2) {
      showError('Chỉ được chọn TỐI ĐA 2 ảnh');
      return;
    }

    const totalSize = Array.from(fileList).reduce(
      (acc, file) => acc + (file.size || 0),
      0
    );

    if (totalSize < limitTotalSize) {
      onSelectImages && onSelectImages(fileList);
    } else {
      showError('Kích thước tối đa 10MB cho tối đa 2 ảnh');
    }
  };

  return (
    <>
      <button
        className="w-fit h-fit rounded px-4 py-2 bg-cyan-100 border-solid border-2 border-blue-400 text-blue-500 text-[0.5rem] hover:border-blue-600 transition-colors"
        type="button"
        onClick={triggerInputFile}
      >
        <i className="fi fi-br-picture inline-block"></i>
        <span className="ml-2">Thêm hình ảnh (Tối đa 2)</span>
      </button>{' '}
      <input
        type="file"
        name="imageInput"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        multiple={true}
        max={2}
        onChange={(e) => handleUploadImage(e.target.files)}
      />
    </>
  );
}

export default ImageInput;
