import { PRODUCT_LOADER } from '@constants/base64img';
import './styles.scss';
import Image from 'next/image';

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="product-img">
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={PRODUCT_LOADER}
      />
    </div>
  );
};

export default ProductImage;
