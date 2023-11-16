import Image, { StaticImageData } from "next/image";

type iconType = {
  media: StaticImageData | string;
  alt: string;
  customWidth?: number;
  customHeight?: number;
};
const Icon = ({ media, alt, customWidth, customHeight }: iconType) => {
  return (
    <Image
      src={media}
      alt={alt}
      width={customWidth || 40}
      height={customHeight || 40}
    ></Image>
  );
};

export default Icon;
