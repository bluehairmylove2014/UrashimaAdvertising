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

const getAdDetailResponseSchema = z.object({
  id: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  locationType: z.string(),
  adsForm: z.string(),
  planned: z.boolean(),
  images: z.array(
    z.object({
      image: z.string(),
    })
  ),
  adsBoard: z.array(
    z.object({
      id: z.number(),
      adsType: z.string(),
      height: z.number(),
      width: z.number(),
      image: z.string(),
      expiredDate: z.string(),
    })
  ),
});


const getAllOfficerAdsResponseSchema = getAllAdsResponseSchema;
const getOfficerAdDetailResponseSchema = getAdDetailResponseSchema;

export { 
  getAllAdsResponseSchema, 
  getAdDetailResponseSchema, 
  getAllOfficerAdsResponseSchema,
  getOfficerAdDetailResponseSchema 
};
