import z from 'zod';

const reportResponseSchema = z.object({
  message: z.string(),
});

export { reportResponseSchema };
