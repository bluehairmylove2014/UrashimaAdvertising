import z from 'zod';

const getAllSettingsResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
);

const modifySettingsResponseSchema = z.object({
  message: z.string(),
});

export { getAllSettingsResponseSchema, modifySettingsResponseSchema };
