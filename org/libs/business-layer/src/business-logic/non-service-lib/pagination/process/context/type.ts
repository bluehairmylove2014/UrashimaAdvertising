import { IPagination } from '@business-layer/services/entities';

export type paginationVersionType = {
  id: number;
  data: IPagination;
};
export interface PaginationState {
  version: paginationVersionType[];
}

export type PaginationAction =
  | {
      type: 'INIT_INSTANCE';
      payload: IPagination;
    }
  | {
      type: 'SET_PAGINATION_DATA';
      payload: {
        id: number;
        data: IPagination;
      };
    }
  | {
      type: 'SET_CURRENT_PAGE';
      payload: {
        id: number;
        currentPage: number;
      };
    };

export type PaginationContextType = {
  state: PaginationState;
  dispatch: React.Dispatch<PaginationAction>;
};
