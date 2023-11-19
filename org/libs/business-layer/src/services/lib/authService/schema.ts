import z from "zod";

const authenticationResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
  refreshToken: z.string(),
});
const refreshTokenResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
});

export { authenticationResponseSchema, refreshTokenResponseSchema };
