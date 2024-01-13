import z from 'zod';
import { adBoardSchema, adLocationSchema } from '../adsService/schema';

const reportResponseSchema = z.object({
  message: z.string(),
});
const officerReportSchema = z.object({
  id: z.number(),
  lat: z.number(),
  lon: z.number(),
  address: z.string(),
  reportType: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  content: z.string(),
  images: z.array(
    z.object({
      image: z.string(),
    })
  ),
  reportStatus: z.boolean(),
  treatmentProcess: z.string(),
  submissionDate: z.string(),
});
const getAllOfficerReportsResponseSchema = z.array(officerReportSchema);
const getOfficerReportDetailResponseSchema = officerReportSchema.extend({
  adsBoard: adBoardSchema.nullable(),
  adsPoint: adLocationSchema.nullable(),
  location: z
    .object({
      id: z.number(),
      longitude: z.number(),
      latitude: z.number(),
      address: z.string(),
    })
    .nullable(),
});

export {
  reportResponseSchema,
  getAllOfficerReportsResponseSchema,
  getOfficerReportDetailResponseSchema,
};
