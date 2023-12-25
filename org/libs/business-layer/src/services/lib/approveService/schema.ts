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
export {
  getApproveListResponseSchema,
  createNewApproveRequestResponseSchema,
  deleteApproveRequestResponseSchema,
};
