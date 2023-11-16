'use client';
import { productImagesType } from '@modules/services/entities';
import './styles.scss';
import { useEffect, useRef, useState } from 'react';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import ProductImage from '@presentational/atoms/ProductImage/ProductImage';

const defaultRange = 4; // 5 images
const ProductGallery = ({ images }: { images: productImagesType | null }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [listPos, setListPos] = useState<number>(0);
  const viewRange = useRef<{ start: number; end: number }>({
    start: 0,
    end: 4,
  });

  useEffect(() => {
    console.log('selectedImage: ', selectedImage);
    if (images) {
      if (selectedImage > viewRange.current.end) {
        setListPos((selectedImage - defaultRange) * 20);
        viewRange.current = {
          start: selectedImage - defaultRange,
          end: selectedImage,
        };
      }
      if (selectedImage < viewRange.current.start) {
        setListPos(selectedImage * 20);
        viewRange.current = {
          start: selectedImage,
          end: selectedImage + defaultRange,
        };
      }
      console.log(viewRange.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  return (
    <div className="product-gallery">
      {Array.isArray(images) ? (
        <>
          <div className="gallery__main">
            <div className="control-button__left">
              <CommonButton
                style="square"
                onClick={() => {
                  if (selectedImage - 1 >= 0) {
                    setSelectedImage(selectedImage - 1);
                  } else {
                    setSelectedImage(images.length - 1);
                  }
                }}
              >
                <i className="fi fi-br-angle-small-left"></i>
              </CommonButton>
            </div>
            <div className="control-button__right">
              <CommonButton
                style="square"
                onClick={() => {
                  if (selectedImage + 1 < images.length) {
                    setSelectedImage(selectedImage + 1);
                  } else {
                    setSelectedImage(0);
                  }
                }}
              >
                <i className="fi fi-br-angle-small-right"></i>
              </CommonButton>
            </div>
            <ProductImage
              src={images[selectedImage].imageSrc}
              alt={images[selectedImage].imageAlt}
            />
          </div>
          <div className="gallery__list-wrapper">
            <div className="gallery__list" style={{ left: `-${listPos}%` }}>
              {images.map((im, index) => (
                <button
                  key={im.imageId}
                  onClick={() => setSelectedImage(index)}
                  className={selectedImage === index ? 'active' : ''}
                >
                  <ProductImage src={im.imageSrc} alt={im.imageAlt} />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductGallery;
