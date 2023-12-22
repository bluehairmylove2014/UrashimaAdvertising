'use client';

import EmptyIcon from '@presentational/atoms/EmptyIcon';
import RowLoader from '@presentational/atoms/RowLoader';
import Pagination from '@presentational/molecules/Pagination';
import {
  calculateMaxPage,
  formatDate,
  getCurrentDateTime,
  isDateGreaterThan,
  slicePaginationData,
} from '@utils/helpers';
import { useEffect, useState } from 'react';
import {
  useGetPagination,
  useSetPaginationData,
} from '@business-layer/business-logic/non-service-lib/pagination';
import TableRow from '@presentational/molecules/TableRow';
import IconButton from '@presentational/atoms/IconButton';
import { useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';
import { IApprove } from '@business-layer/services/entities/approve';
import { debounce } from '@business-layer/business-logic/helper';
import ModernSelect, {
  modernSelectOptionType,
} from '@presentational/atoms/ModernSelect';

const START_PAGE = 1;
const MAX_ELEMENT_PER_PAGE = 4;

type filterCriteriaType = {
  searchKey: string | null;
  timeFilter: string | null;
  requestStatusFilter: string | null;
};
function ApprovesList({
  inputApproveData,
  timeFilterOptions,
  requestStatusFilterOptions,
}: {
  inputApproveData: IApprove[] | null;
  timeFilterOptions: modernSelectOptionType[];
  requestStatusFilterOptions: modernSelectOptionType[];
}) {
  const currentDate = getCurrentDateTime();
  const router = useRouter();
  const { setPaginationData } = useSetPaginationData();
  const paginationData = useGetPagination();
  const [approveData, setApproveData] = useState<IApprove[] | null>(
    inputApproveData
  );
  const [filterCriteria, setFilterCriteria] = useState<filterCriteriaType>({
    searchKey: null,
    timeFilter: null,
    requestStatusFilter: null,
  });

  useEffect(() => {
    setApproveData(inputApproveData);
    if (Array.isArray(inputApproveData)) {
      setPaginationData({
        currentPage: START_PAGE,
        maxPage: calculateMaxPage(inputApproveData, MAX_ELEMENT_PER_PAGE),
        maxElementPerPage: MAX_ELEMENT_PER_PAGE,
        dataLength: inputApproveData.length,
      });
    }
  }, [inputApproveData]);

  useEffect(() => {
    let newApproveData = inputApproveData ? [...inputApproveData] : [];
    if (filterCriteria.timeFilter) {
      switch (filterCriteria.timeFilter) {
        case 'Đã quá hạn': {
          newApproveData = newApproveData.filter((approve) =>
            isDateGreaterThan(currentDate, approve.contractEnd)
          );
          break;
        }
        case 'Chưa hoạt động': {
          newApproveData = newApproveData.filter((approve) =>
            isDateGreaterThan(approve.contractStart, currentDate)
          );
          break;
        }
        case 'Đang hoạt động': {
          newApproveData = newApproveData.filter(
            (approve) =>
              isDateGreaterThan(currentDate, approve.contractStart) &&
              isDateGreaterThan(approve.contractEnd, currentDate)
          );
          break;
        }
      }
    }
    if (filterCriteria.requestStatusFilter) {
      newApproveData = newApproveData.filter(
        (approve) =>
          filterCriteria.requestStatusFilter === approve.requestStatus
      );
    }
    if (filterCriteria.searchKey) {
      const searchCompanyName = filterCriteria.searchKey.trim().toLowerCase();
      newApproveData = newApproveData.filter((approve) => {
        const approveCompanyName = approve.companyName.toLowerCase();
        return (
          approveCompanyName.includes(searchCompanyName) ||
          searchCompanyName.includes(approveCompanyName)
        );
      });
    }

    setPaginationData({
      currentPage: START_PAGE,
      maxPage: calculateMaxPage(newApproveData, MAX_ELEMENT_PER_PAGE),
      maxElementPerPage: MAX_ELEMENT_PER_PAGE,
      dataLength: newApproveData.length,
    });
    setApproveData(newApproveData);
  }, [
    filterCriteria.searchKey,
    filterCriteria.timeFilter,
    filterCriteria.requestStatusFilter,
  ]);

  // Methods
  const renderDateTime = (date: Date) => {
    const dateFormatted = formatDate(date);
    return (
      <span>{`${dateFormatted.time24} | ${dateFormatted.dateMonthYear}`}</span>
    );
  };
  const onSearch = debounce((inputValue: string) => {
    setFilterCriteria({
      ...filterCriteria,
      searchKey: inputValue,
    });
  }, 500);
  const filterByTime = (option: modernSelectOptionType) => {
    setFilterCriteria({
      ...filterCriteria,
      timeFilter: option.value,
    });
  };
  const filterByRequestStatus = (option: modernSelectOptionType) => {
    setFilterCriteria({
      ...filterCriteria,
      requestStatusFilter: option.value,
    });
  };

  return (
    <>
      <div className="flex flex-row gap-4 justify-between mb-8 w-full">
        <form className="flex-shrink w-96 relative border-solid border-[1px] border-zinc-400 rounded overflow-hidden">
          <i className="fi fi-rr-search absolute top-1/2 left-4 transform -translate-y-1/2 bottom-[4px] text-[0.65rem]"></i>
          <input
            name="searchBox"
            type="text"
            className="px-8 py-2 w-full text-[0.65rem] outline-none"
            placeholder="Search by company name..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </form>
        <div className="flex flex-row justify-end flex-grow gap-2">
          <ModernSelect
            onOptionSelect={filterByTime}
            options={timeFilterOptions}
            style="clean"
          />
          <ModernSelect
            onOptionSelect={filterByRequestStatus}
            options={requestStatusFilterOptions}
            style="clean"
          />
        </div>
      </div>
      <div className="shadow-sm overflow-x-auto overflow-y-hidden rounded-md">
        <table className="w-full table-fixed text-xs text-center">
          <thead className="bg-indigo-950 text-white font-semibold">
            <tr>
              <th scope="col" className="px-2 py-3 w-[5%]">
                STT
              </th>
              <th scope="col" className="px-2 py-3 whitespace-nowrap w-[10%]">
                Tên công ty
              </th>
              <th scope="col" className="px-2 py-3 w-[30%]">
                Thông tin công ty
              </th>
              <th scope="col" className="px-2 py-3 w-[30%]">
                Địa chỉ cấp phép
              </th>
              <th scope="col" className="px-2 py-3 w-[20%]">
                Thời hạn
              </th>
              <th scope="col" className="px-2 py-3 w-[5%]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(approveData) ? (
              approveData.length > 0 ? (
                slicePaginationData(
                  approveData,
                  paginationData.currentPage,
                  paginationData.maxPage,
                  paginationData.maxElementPerPage
                ).map((approve, index) => (
                  <tr
                    className="py-4 even:bg-gray-100"
                    key={`adLocation@${approve.id}`}
                  >
                    <TableRow
                      multiRowColumn={3}
                      listData={[
                        approve.id,
                        approve.companyName,
                        <>
                          <span className="whitespace-nowrap">
                            <span className="font-semibold">Email:</span>{' '}
                            {approve.email}
                          </span>
                          <br />
                          <span className="whitespace-nowrap">
                            <span className="font-semibold">
                              Số điện thoại:
                            </span>{' '}
                            {approve.phone}
                          </span>
                          <br />
                          <span>
                            <span className="font-semibold">Địa chỉ:</span>{' '}
                            {approve.address}
                          </span>
                          <br />
                          <span className="whitespace-nowrap font-semibold ">
                            <span>Tình trạng:</span>{' '}
                            {approve.requestStatus === 'accepted' ? (
                              <span className="text-green-600">
                                Đã cấp phép
                              </span>
                            ) : approve.requestStatus === 'rejected' ? (
                              <span className="text-red-600">Bị từ chối</span>
                            ) : (
                              <span className="text-orange-600">
                                Đang xử lý
                              </span>
                            )}
                          </span>
                        </>,
                        approve.adsPoint.address,
                        <span>
                          {renderDateTime(new Date(approve.contractStart))}
                          <br />
                          Tới
                          <br />
                          {renderDateTime(new Date(approve.contractEnd))}
                        </span>,
                        <IconButton
                          type="button"
                          shape="square"
                          callback={() => {
                            router.push(
                              OFFICER_PAGES.APPROVE_DETAIL + `/${approve.id}`
                            );
                          }}
                        >
                          <i className="fi fi-sr-file-circle-info text-blue-600 text-sm hover:text-blue-400 transition-colors"></i>
                        </IconButton>,
                      ]}
                    />
                  </tr>
                ))
              ) : (
                <tr className="py-4">
                  <td colSpan={6} className="py-12">
                    <EmptyIcon label="Không tìm thấy yêu cầu nào" />
                  </td>
                </tr>
              )
            ) : (
              <RowLoader colNumber={6} />
            )}
          </tbody>
        </table>
        {paginationData.maxPage > 1 ? <Pagination /> : <></>}
      </div>
    </>
  );
}

export default ApprovesList;
