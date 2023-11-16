import "./styles.scss";

const defaultSize = 50;
const defaultThick = 8;
const CommonLoader = ({ customSize }: { customSize?: number }) => {
  const size = customSize || defaultSize;
  const linkThick = (size * defaultThick) / 50;
  return (
    <div className="common-loader__wrapper">
      <div
        className="common-loader"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          WebkitMask: `radial-gradient(farthest-side, #0000 calc(100% - ${linkThick}px), #000 0)`,
        }}
      ></div>
    </div>
  );
};

export default CommonLoader;
