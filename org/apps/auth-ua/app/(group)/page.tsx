'use client';

import { useNotification } from '@presentational/atoms/Notification';

export default function Auth() {
  const { showSuccess, showError } = useNotification();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p className="text-blue-800 text">Xin chao chung may</p>
      <button
        className="bg-neutral-400 hover:bg-neutral-200"
        onClick={() => {
          showSuccess('This is success message');
        }}
      >
        Show success notification
      </button>
      <button
        className="bg-red-700 hover:bg-red-400"
        onClick={() => {
          showError('This is error message');
        }}
      >
        Show error notification
      </button>
    </div>
  );
}
