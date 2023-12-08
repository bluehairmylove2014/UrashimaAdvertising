import z from 'zod';

const getLocationDetailResponseSchema = z.object({
  display_name: z.string(),
  amenity: z.string(),
  house_number: z.string(),
  road: z.string(),
  suburb: z.string(),
  town: z.string(),
  postcode: z.number(),
  country: z.string(),
  country_code: z.string(),
  longt: z.number(),
  latt: z.number(),
});

export { getLocationDetailResponseSchema };
