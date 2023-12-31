import z from 'zod';

const regionResponseSchema = z.array(
  z.object({
    id: z.number(),
    ward: z.string(),
    district: z.string(),
  })
);

export { regionResponseSchema };
