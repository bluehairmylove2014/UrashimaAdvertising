import { z } from "zod";

const productImagesSchema = z.array(
  z.object({
    imageId: z.number(),
    imageSrc: z.string(),
    imageAlt: z.string(),
    imageCreatedAt: z.string(),
  })
);
const productDetailsSchema = z.array(
  z.object({
    productDetailId: z.number(),
    productDetailTag: z.string(),
    productDetailChildren: z.any().nullable(),
    productDetailSrc: z.string().nullable(),
    productDetailAlt: z.string().nullable(),
  })
);
const productSpecificationsSchema = z.array(
  z.object({
    productSpecificationId: z.number(),
    productSpecificationName: z.string(),
    productSpecificationDetail: z.string(),
  })
);
const productFeaturesSchema = z.array(
  z.object({
    featureId: z.number(),
    featureName: z.string(),
  })
);

const getProductResponseSchema = z.object({
  productId: z.number(),
  productThumbnail: z.string().url(),
  productName: z.string(),
  productCategory: z.string(),
  productPrice: z.number(),
  productDiscount: z.number(),
  productStock: z.number(),
  productCreatedAt: z.string(),
  productFeatures: productFeaturesSchema,
  productImages: productImagesSchema,
  productDetails: productDetailsSchema,
  productSpecifications: productSpecificationsSchema,
});

const getHotProductResponseSchema = z.array(
  z.object({
    productId: z.number(),
    productThumbnail: z.string().url(),
    productName: z.string(),
    productPrice: z.number(),
    productDiscount: z.number(),
    productStock: z.number(),
    productCreatedAt: z.string(),
    productFeatures: productFeaturesSchema,
  })
);

export { getProductResponseSchema, getHotProductResponseSchema };
