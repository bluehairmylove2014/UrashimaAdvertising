import { IAdLocation, IAdsBoard } from '@business-layer/services/entities';
import {
  IApprove,
  IApproveBase,
} from '@business-layer/services/entities/approve';

export type getApproveListResponseType = IApprove[];

export type adBoardApproveDataType = IApproveBase & {
  adsBoard: IAdsBoard;
};
export type createNewAdBoardApproveRequestParamsType = {
  approveData: adBoardApproveDataType;
  token: string | null;
};

export type adLocationApproveDataType = IApproveBase & {
  adsBoard: IApproveBase & {
    adsPoint: IAdLocation;
  };
};
export type createNewAdLocationApproveRequestParamsType = {
  approveData: adLocationApproveDataType;
  token: string | null;
};
export type createNewApproveRequestResponseType = { message: string };
