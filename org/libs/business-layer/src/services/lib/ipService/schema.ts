import z from 'zod';

const getCurrentLocationResponseSchema = z.object({
  query: z.string(),
  status: z.string(),
  country: z.string(),
  countryCode: z.string(),
  region: z.string(),
  regionName: z.string(),
  city: z.string(),
  zip: z.string(),
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  isp: z.string(),
  org: z.string(),
  as: z.string(),
});

export { getCurrentLocationResponseSchema };
