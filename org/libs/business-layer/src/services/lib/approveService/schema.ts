import z from 'zod';
import { adBoardSchema, adLocationSchema } from '../adsService/schema';

const getApproveListResponseSchema = z.array(
  z.object({
    id: z.number(),
    adsPointId: z.number(),
    adsContent: z.string(),
    companyName: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    contractStart: z.string(),
    contractEnd: z.string(),
    requestStatus: z.string(),
    adsBoard: adBoardSchema,
    adsPoint: adLocationSchema,
  })
);
const createNewApproveRequestResponseSchema = z.object({
  message: z.string(),
});
const deleteApproveRequestResponseSchema = z.object({
  message: z.string(),
});
const getAllAdModificationRequestResponseSchema = z.array(
  z.object({
    id: z.number(),
    longitude: z.number(),
    latitude: z.number(),
    address: z.string(),
    locationType: z.string(),
    adsForm: z.string(),
    planned: z.boolean(),
    images: z.array(z.object({ image: z.string() })),
    adsBoard: z.array(adBoardSchema),
    adsPointId: z.number(),
    modifyTime: z.string(),
    reasons: z.string(),
  })
);
const approveAdModificationRequestResponseSchema =
  deleteApproveRequestResponseSchema;
const approveAdCreationRequestResponseSchema =
  deleteApproveRequestResponseSchema;

export {
  getApproveListResponseSchema,
  createNewApproveRequestResponseSchema,
  deleteApproveRequestResponseSchema,
  getAllAdModificationRequestResponseSchema,
  approveAdModificationRequestResponseSchema,
  approveAdCreationRequestResponseSchema,
};
