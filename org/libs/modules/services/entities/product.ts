export interface IProduct {
  productId: number;
  productThumbnail: string;
  productName: string;
  productPrice: number;
  productDiscount: number;
  productStock: number;
  productCreatedAt: string;
  productFeatures: {
    featureId: number;
    featureName: string;
  }[];
}

export type productImagesType = {
  imageId: number;
  imageSrc: string;
  imageAlt: string;
}[];
export type detailsType = (
  | {
      productDetailTag: "h3" | "h6" | "p";
      productDetailChildren: any;
    }
  | {
      productDetailTag: "img";
      productDetailSrc: string;
      productDetailAlt: string;
    }
)[];
export type specificationsType = {
  productSpecificationName: string;
  productSpecificationDetail: string;
}[];
export interface IProductDetail extends IProduct {
  productImages: productImagesType;
  productDetails: detailsType;
  productSpecifications: specificationsType;
}
