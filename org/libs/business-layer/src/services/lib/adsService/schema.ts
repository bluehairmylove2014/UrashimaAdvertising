import z from 'zod';

const adLocationSchema = z.object({
  id: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  locationType: z.string(),
  adsForm: z.string(),
  planned: z.boolean(),
  isEmpty: z.boolean().optional(),
});
const adBoardSchema = z.object({
  id: z.number(),
  adsType: z.string(),
  height: z.number(),
  width: z.number(),
  image: z.string(),
  expiredDate: z.string(),
});

const getAllAdsResponseSchema = z.array(adLocationSchema);

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
  adsBoard: z.array(adBoardSchema),
});

const getAllOfficerAdsResponseSchema = getAllAdsResponseSchema;
const getOfficerAdDetailResponseSchema = getAdDetailResponseSchema;

const adsPointModificationSchema = z.object({
  message: z.string(),
});
const getAllAdBoardsResponseSchema = z.array(adBoardSchema);
const anySchema = z.any();

const hqCreateNewAdsSchema = z.object({
  message: z.string(),
});

export {
  adLocationSchema,
  adBoardSchema,
  getAllAdsResponseSchema,
  getAdDetailResponseSchema,
  getAllOfficerAdsResponseSchema,
  getOfficerAdDetailResponseSchema,
  adsPointModificationSchema,
  getAllAdBoardsResponseSchema,
  hqCreateNewAdsSchema,
  anySchema,
};
