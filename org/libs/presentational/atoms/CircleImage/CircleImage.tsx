import Image from "next/image";
import "./styles.scss";

const CircleImage = ({
  src,
  alt,
  size,
}: {
  src: string;
  alt: string;
  size: string;
}) => {
  return (
    <div className="circle-image" style={{ width: size }}>
      <Image src={src} alt={alt} fill />
    </div>
  );
};

export default CircleImage;
