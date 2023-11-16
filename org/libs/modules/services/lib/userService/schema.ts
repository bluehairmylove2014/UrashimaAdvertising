import { z } from "zod";

const getUserResponseSchema = z.object({
  userId: z.number(),
  email: z.string(),
  avatar: z.string().url(),
  fullName: z.string(),
  phoneNumber: z.string().nullable(),
  isSocial: z.boolean(),
  userCreatedAt: z.string(),
  rankId: z.number(),
  rankName: z.string(),
  rankCreatedAt: z.string(),
  addressId: z.number(),
  country: z.string().nullable(),
  province: z.string().nullable(),
  district: z.string().nullable(),
  ward: z.string().nullable(),
  streetAddress: z.string().nullable(),
});

export { getUserResponseSchema };
