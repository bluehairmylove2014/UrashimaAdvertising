import { IAdsBoard } from '@business-layer/services/entities';
import {
  IApprove,
  IApproveBase,
} from '@business-layer/services/entities/approve';

export type getApproveListResponseType = IApprove[];

export type adBoardApproveDataType = Omit<IApproveBase, 'id'> & {
  adsBoard: Omit<IAdsBoard, 'id' | 'expiredDate'>;
};
export type createNewAdBoardApproveRequestParamsType = {
  approveData: adBoardApproveDataType;
  token: string | null;
};
export type createNewApproveRequestResponseType = { message: string };

export type deleteApproveRequestParamsType = {
  id: number;
  token: string | null;
};
export type deleteApproveRequestResponseType = { message: string };
