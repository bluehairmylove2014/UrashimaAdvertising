const shapeStyle = {
  circle: 'rounded-full',
  square: 'rounded-md',
};

type iconButton = {
  shape: 'circle' | 'square';
  callback?: () => void;
  customSize?: string;
  children: React.ReactNode;
};

function IconButton({ shape, callback, customSize, children }: iconButton) {
  return (
    <button
      className={`${shapeStyle[shape]} w-8 h-8`}
      style={{ width: customSize, height: customSize }}
      onClick={() => callback && callback}
    >
      {children}
    </button>
  );
}

export default IconButton;
