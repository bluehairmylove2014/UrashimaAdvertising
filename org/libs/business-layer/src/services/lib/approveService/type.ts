import {
  IAdLocationDetail,
  IAdsBoard,
} from '@business-layer/services/entities';
import {
  IApprove,
  IApproveBase,
} from '@business-layer/services/entities/approve';
import { IAdModificationRequest } from '@business-layer/services/entities/request';

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

export type getAllAdModificationRequestResponseType = IAdModificationRequest[];
export type approveAdModificationRequestParamsType = {
  id: number;
  status: string;
};
export type approveAdModificationRequestResponseType = { message: string };
export type approveAdCreationRequestParamsType = { id: number; status: string };
export type approveAdCreationRequestResponseType = { message: string };
