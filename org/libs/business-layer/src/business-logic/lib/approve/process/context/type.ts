import { IApprove } from '@business-layer/services/entities/approve';

export type timeTypes =
  | 'Đã quá hạn'
  | 'Chưa hoạt động'
  | 'Đang hoạt động'
  | null;
export type requestStatusTypes = 'inprocess' | 'accepted' | 'rejected' | null;

export interface ApproveState {
  approves: IApprove[] | null;
  filterCriteria: {
    searchKey: string | null;
    timeFilter: timeTypes;
    requestStatusFilter: requestStatusTypes;
  };
}

export type ApproveAction =
  | {
      type: 'SET_APPROVES';
      payload: ApproveState['approves'];
    }
  | {
      type: 'DELETE_APPROVE_BY_ID';
      payload: number;
    }
  | {
      type: 'FILTER_BY_SEARCH_KEY';
      payload: string;
    }
  | {
      type: 'FILTER_BY_TIME';
      payload: timeTypes;
    }
  | {
      type: 'FILTER_BY_REQUEST_STATUS';
      payload: requestStatusTypes;
    };

export type ApproveContextType = {
  state: ApproveState;
  dispatch: React.Dispatch<ApproveAction>;
};
