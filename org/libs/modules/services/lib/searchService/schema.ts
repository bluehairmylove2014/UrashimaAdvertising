import { z } from "zod";

const productFeaturesSchema = z.array(
  z.object({
    featureId: z.number(),
    featureName: z.string(),
  })
);
const searchProductResponseSchema = z.array(
  z.object({
    productId: z.number(),
    productThumbnail: z.string().url(),
    productName: z.string(),
    productCategory: z.string(),
    productPrice: z.number().min(0),
    productDiscount: z.number().min(0).max(1),
    productStock: z.number().min(0),
    productCreatedAt: z.string().datetime(),
    productFeatures: productFeaturesSchema,
  })
);

export { searchProductResponseSchema };
