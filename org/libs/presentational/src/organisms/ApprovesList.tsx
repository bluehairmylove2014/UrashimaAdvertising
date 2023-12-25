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
import { useEffect, useRef, useState } from 'react';
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
import Image from 'next/image';
import {
  useDeleteApproveRequest,
  useHandleApprove,
  useHandleFilterApprove,
} from '@business-layer/business-logic/lib/approve/process/hooks';
import YesNoPopup from '@presentational/molecules/YesNoPopup';
import { useNotification } from '@presentational/atoms/Notification';
import {
  requestStatusTypes,
  timeTypes,
} from '@business-layer/business-logic/lib/approve/process/context';

const START_PAGE = 1;
const MAX_ELEMENT_PER_PAGE = 4;

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
  const { approvesData, setApproves, deleteApproveById } = useHandleApprove();
  const { filterByRequestStatus, filterBySearchKey, filterByTime } =
    useHandleFilterApprove();
  const { onDeleteApproveRequest } = useDeleteApproveRequest();
  const [isShowingPopup, setIsShowingPopup] = useState<boolean>(false);
  const needDeletedRequestId = useRef<number | null>(null);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    setApproves(inputApproveData);
  }, [inputApproveData]);

  useEffect(() => {
    if (Array.isArray(approvesData)) {
      setPaginationData({
        currentPage: START_PAGE,
        maxPage: calculateMaxPage(approvesData, MAX_ELEMENT_PER_PAGE),
        maxElementPerPage: MAX_ELEMENT_PER_PAGE,
        dataLength: approvesData.length,
      });
    }
  }, [approvesData]);

  // Methods
  const renderDateTime = (date: Date) => {
    const dateFormatted = formatDate(date);
    return (
      <span>{`${dateFormatted.time24} | ${dateFormatted.dateMonthYear}`}</span>
    );
  };
  const onSearch = debounce((inputValue: string) => {
    filterBySearchKey(inputValue);
  }, 500);
  const handleFilterByTime = (option: modernSelectOptionType) => {
    filterByTime(option.value as timeTypes);
  };
  const handleFilterByRequestStatus = (option: modernSelectOptionType) => {
    filterByRequestStatus(option.value as requestStatusTypes);
  };
  const showDeletePopup = (id: number) => {
    needDeletedRequestId.current = id;
    setIsShowingPopup(true);
  };
  const handleDeleteRequest = (result: boolean) => {
    if (result && needDeletedRequestId.current) {
      onDeleteApproveRequest(needDeletedRequestId.current)
        .then((msg) => {
          showSuccess(msg);
        })
        .catch((error) => showError(error.msg));
    }
    needDeletedRequestId.current = null;
    setIsShowingPopup(false);
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
            onOptionSelect={handleFilterByTime}
            options={timeFilterOptions}
            style="clean"
          />
          <ModernSelect
            onOptionSelect={handleFilterByRequestStatus}
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
              <th scope="col" className="px-2 py-3 w-[25%]">
                Địa chỉ cấp phép
              </th>
              <th scope="col" className="px-2 py-3 w-[20%]">
                Thời hạn
              </th>
              <th scope="col" className="px-2 py-3 w-[10%]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(approvesData) ? (
              approvesData.length > 0 ? (
                slicePaginationData<IApprove>(
                  approvesData,
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
                        <span className="flex flex-row items-center justify-center gap-2">
                          <Image
                            src={approve.adsBoard.image}
                            alt={approve.adsPoint.address}
                            width={70}
                            height={70}
                            className="rounded object-cover"
                          />
                          <span>{approve.adsPoint.address}</span>
                        </span>,
                        <span>
                          {renderDateTime(new Date(approve.contractStart))}
                          <br />
                          Tới
                          <br />
                          {renderDateTime(new Date(approve.contractEnd))}
                        </span>,
                        <span className="flex flex-row gap-2">
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
                          </IconButton>
                          {approve.requestStatus === 'inprocess' ? (
                            <IconButton
                              type="button"
                              shape="square"
                              callback={() => {
                                showDeletePopup(approve.id);
                              }}
                            >
                              <i className="fi fi-ss-trash text-red-600 text-sm hover:text-red-400 transition-colors"></i>
                            </IconButton>
                          ) : (
                            <></>
                          )}
                        </span>,
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
        <YesNoPopup
          message="Bạn có chắc muốn xoá không?"
          onResult={handleDeleteRequest}
          isActive={isShowingPopup}
        />
      </div>
    </>
  );
}

export default ApprovesList;
