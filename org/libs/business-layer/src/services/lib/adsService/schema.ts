import z from 'zod';

const getAllAdsResponseSchema = z.array(
  z.object({
    id: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
    locationType: z.string(),
    adsForm: z.string(),
    planned: z.boolean(),
  })
);

export { getAllAdsResponseSchema };
