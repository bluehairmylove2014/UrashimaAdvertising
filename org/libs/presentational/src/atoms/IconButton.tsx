const shapeStyle = {
  circle: 'rounded-full',
  square: 'rounded-md',
};

type iconButton = {
  type?: 'button' | 'submit' | 'reset';
  shape: 'circle' | 'square';
  callback?: () => void;
  customSize?: string;
  children: React.ReactNode;
};

function IconButton({
  type,
  shape,
  callback,
  customSize,
  children,
}: iconButton) {
  return (
    <button
      type={type}
      className={`${shapeStyle[shape]} w-8 h-8`}
      style={{ width: customSize, height: customSize }}
      onClick={() => callback && callback()}
    >
      {children}
    </button>
  );
}

export default IconButton;
