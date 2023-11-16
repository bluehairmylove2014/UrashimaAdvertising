import z from "zod";

// Schema for IMessageResponse
const messageResponseSchema = z.object({
  message: z.string(),
});

// Schema for IProduct
const productSchema = z.object({
  productId: z.number(),
  productThumbnail: z.string().url(),
  productName: z.string(),
  productCategory: z.string(),
  productPrice: z.number(),
  productDiscount: z.number(),
  productStock: z.number(),
  productCreatedAt: z.string(),
});

// Schema for ICartItem
const cartItemSchema = z.object({
  item: productSchema,
  quantity: z.number(),
});

// Schema for ICart
const cartSchema = z.object({
  items: z.array(cartItemSchema).nullable(),
});

export { messageResponseSchema, cartSchema };
