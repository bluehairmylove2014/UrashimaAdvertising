import z from "zod";

const getCouponResponseSchema = z.object({
  message: z.string(),
  couponDiscount: z.number().nullable(),
});

export { getCouponResponseSchema };
