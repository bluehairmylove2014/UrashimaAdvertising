import z from 'zod';

const getAccountInfoResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  fullName: z.string(),
  dateOfBirth: z.string(),
  phone: z.string(),
  role: z.string(),
  unitUnderManagement: z.string(),
});
const modifyAccountInfoResponseSchema = z.object({
  message: z.string(),
});
export { getAccountInfoResponseSchema, modifyAccountInfoResponseSchema };
