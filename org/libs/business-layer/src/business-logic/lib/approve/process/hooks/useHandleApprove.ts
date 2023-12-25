// Import necessary modules and functions
import { IApprove } from '@business-layer/services/entities/approve';
import { useApproveContext } from '../context';
import { useMemo } from 'react';
import { getCurrentDateTime, isDateGreaterThan } from '@utils/helpers';

type useHandleApproveReturnType = {
  setApproves: (approvesData: IApprove[] | null) => void;
  deleteApproveById: (id: number) => void;
  approvesData: IApprove[] | null;
};
export const useHandleApprove = (): useHandleApproveReturnType => {
  const { state, dispatch } = useApproveContext();
  const currentDate = getCurrentDateTime();

  const setApproves = (approvesData: IApprove[] | null): void => {
    dispatch({
      type: 'SET_APPROVES',
      payload: approvesData,
    });
  };

  const deleteApproveById = (id: number): void => {
    dispatch({
      type: 'DELETE_APPROVE_BY_ID',
      payload: id,
    });
  };

  return {
    approvesData: useMemo(() => {
      if (!state.approves) return state.approves;
      let filterResult = [...state.approves];

      if (state.filterCriteria?.requestStatusFilter) {
        filterResult = filterResult.filter(
          (approve) =>
            state.filterCriteria.requestStatusFilter === approve.requestStatus
        );
      }
      if (state.filterCriteria?.timeFilter) {
        switch (state.filterCriteria.timeFilter) {
          case 'Đã quá hạn': {
            filterResult = filterResult.filter((approve) =>
              isDateGreaterThan(currentDate, approve.contractEnd)
            );
            break;
          }
          case 'Chưa hoạt động': {
            filterResult = filterResult.filter((approve) =>
              isDateGreaterThan(approve.contractStart, currentDate)
            );
            break;
          }
          case 'Đang hoạt động': {
            filterResult = filterResult.filter(
              (approve) =>
                isDateGreaterThan(currentDate, approve.contractStart) &&
                isDateGreaterThan(approve.contractEnd, currentDate)
            );
            break;
          }
        }
      }
      if (state.filterCriteria?.searchKey) {
        const searchCompanyName = state.filterCriteria.searchKey
          .trim()
          .toLowerCase();
        filterResult = filterResult.filter((approve) => {
          const approveCompanyName = approve.companyName.toLowerCase();
          return (
            approveCompanyName.includes(searchCompanyName) ||
            searchCompanyName.includes(approveCompanyName)
          );
        });
      }

      return filterResult;
    }, [
      state.approves,
      state.filterCriteria?.requestStatusFilter,
      state.filterCriteria?.searchKey,
      state.filterCriteria?.timeFilter,
    ]),
    setApproves,
    deleteApproveById,
  };
};
