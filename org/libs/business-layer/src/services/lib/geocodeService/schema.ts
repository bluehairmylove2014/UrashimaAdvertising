import z from 'zod';

const getLocationDetailResponseSchema = z.object({
  display_name: z.string(),
  amenity: z.string().nullable(),
  house_number: z.string().nullable(),
  road: z.string().nullable(),
  suburb: z.string(),
  town: z.string().nullable(),
  postcode: z.number(),
  country: z.string(),
  country_code: z.string(),
  longt: z.number(),
  latt: z.number(),
});

export { getLocationDetailResponseSchema };
