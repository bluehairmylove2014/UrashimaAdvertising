// Import necessary modules and functions
import { requestStatusTypes, timeTypes, useApproveContext } from '../context';

type useHandleFilterApproveReturnType = {
  filterByRequestStatus: (requestStatus: requestStatusTypes) => void;
  filterByTime: (time: timeTypes) => void;
  filterBySearchKey: (searchKey: string) => void;
};
export const useHandleFilterApprove = (): useHandleFilterApproveReturnType => {
  const { state, dispatch } = useApproveContext();

  const filterByRequestStatus = (requestStatus: requestStatusTypes): void => {
    dispatch({
      type: 'FILTER_BY_REQUEST_STATUS',
      payload: requestStatus,
    });
  };

  const filterByTime = (time: timeTypes): void => {
    dispatch({
      type: 'FILTER_BY_TIME',
      payload: time,
    });
  };

  const filterBySearchKey = (searchKey: string): void => {
    dispatch({
      type: 'FILTER_BY_SEARCH_KEY',
      payload: searchKey,
    });
  };

  return {
    filterByRequestStatus,
    filterByTime,
    filterBySearchKey,
  };
};
