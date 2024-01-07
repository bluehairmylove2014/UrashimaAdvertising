'use client';

import EmptyIcon from '@presentational/atoms/EmptyIcon';
import RowLoader from '@presentational/atoms/RowLoader';
import Pagination from '@presentational/molecules/Pagination';
import {
  calculateMaxPage,
  slicePaginationData,
  formatDate,
  isDateGreaterThan,
  getCurrentDateTime,
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
import {
  useGetAllAdModificationRequest,
  useGetAllCreationRequest,
} from '@business-layer/business-logic/lib/approve/process/hooks';
import { HQ_PAGES } from '@constants/hqPages';
import ModernSelect from '@presentational/atoms/ModernSelect';
import { regionResponseType } from '@business-layer/services';
import MultipleLayerSelect, {
  mulSelectOptionType,
} from '@presentational/atoms/MultipleLayerSelect';

const START_PAGE = 1;
const MAX_ELEMENT_PER_PAGE = 4;
const REQUEST_TYPES = {
  MOD: 'Chỉnh sửa',
  CRE: 'Thêm mới',
};

type displayDataType = {
  id: number;
  pointData: {
    latitude: number;
    longitude: number;
    address: string;
  };
  additionData?: {
    companyName: string;
    phone: string;
    address: string;
    contractStart: string;
    contractEnd: string;
  };
  reasonsData: string;
  requestTypes: string;
  href: string;
};

type additionFuncParamsType = {
  regionsData: regionResponseType | null;
};
function AdRequestTable({ regionsData }: additionFuncParamsType) {
  const router = useRouter();
  const modificationRequests = useGetAllAdModificationRequest();
  const creationRequests = useGetAllCreationRequest();
  const { setPaginationData } = useSetPaginationData();
  const paginationData = useGetPagination();
  const [requestData, setRequestData] = useState<displayDataType[] | null>(
    null
  );
  const backupRequestData = useRef<displayDataType[] | null>(null);
  const [districts, setDistricts] = useState<mulSelectOptionType | null>(null);

  useEffect(() => {
    if (regionsData) {
      const districts: mulSelectOptionType = { ['Tất cả các quận']: [] };
      regionsData.forEach((r) => {
        const sameKey = Object.keys(districts).find((dk) => dk === r.district);
        if (sameKey) {
          districts[sameKey].push(r.ward);
        } else {
          districts[r.district] = ['Tất cả', r.ward];
        }
      });
      setDistricts(districts);
    }
  }, [regionsData]);

  useEffect(() => {
    if (Array.isArray(requestData)) {
      setPaginationData({
        currentPage: START_PAGE,
        maxPage: calculateMaxPage(requestData, MAX_ELEMENT_PER_PAGE),
        maxElementPerPage: MAX_ELEMENT_PER_PAGE,
        dataLength: requestData.length,
      });
    }
  }, [requestData]);

  useEffect(() => {
    if (
      Array.isArray(modificationRequests) &&
      Array.isArray(creationRequests)
    ) {
      let displayData: displayDataType[] = [];
      modificationRequests.forEach((mr, i) =>
        displayData.push({
          id: i,
          pointData: {
            latitude: mr.latitude,
            longitude: mr.longitude,
            address: mr.address,
          },
          reasonsData: mr.reasons,
          requestTypes: REQUEST_TYPES.MOD,
          href: HQ_PAGES.AD_MODIFICATION_REQUESTS + `?id=${mr.id}`,
        })
      );
      creationRequests.forEach((cr, i) =>
        displayData.push({
          id: i + modificationRequests.length,
          pointData: {
            latitude: cr.adsPoint.latitude,
            longitude: cr.adsPoint.longitude,
            address: cr.adsPoint.address,
          },
          additionData: {
            companyName: cr.companyName,
            phone: cr.phone,
            address: cr.address,
            contractStart: cr.contractStart,
            contractEnd: cr.contractEnd,
          },
          reasonsData: '',
          requestTypes: REQUEST_TYPES.CRE,
          href: HQ_PAGES.AD_APPROVE_REQUESTS + `?id=${cr.id}`,
        })
      );
      setRequestData(displayData);
      backupRequestData.current = displayData;
    }
  }, [modificationRequests, creationRequests]);

  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function filterByArea(requestData: displayDataType[], specificArea: string) {
    const escapedArea = escapeRegExp(specificArea);
    const regex = new RegExp(
      `(?:[.,\\s]*\\b${escapedArea}\\b[.,\\s]*([\\w\\s]+)(?:[.,\\s]*|$))`,
      'i'
    );

    return requestData.filter((r) => {
      return regex.test(r.pointData.address);
    });
  }

  const handleFilterByRegion = ({
    district,
    ward,
  }: {
    district: string | null;
    ward: string | null;
  }) => {
    if (backupRequestData.current) {
      if (district === null) {
        setRequestData(backupRequestData.current);
      } else if (ward === null) {
        setRequestData(filterByArea(backupRequestData.current, district));
      } else {
        setRequestData(
          filterByArea(filterByArea(backupRequestData.current, district), ward)
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-row gap-4 justify-between mt-4 mb-8 w-full h-8">
        <></>
        <div className="flex flex-row justify-end flex-grow gap-2">
          <MultipleLayerSelect
            label="Tất cả các quận"
            onOptionSelect={handleFilterByRegion}
            options={districts}
            style="softCyan"
            disabled={false}
          />
          {/* <ModernSelect
            onOptionSelect={handleFilter}
            options={options}
            defaultValue={defaultValue}
          /> */}
        </div>
      </div>
      <div className="shadow-sm overflow-x-auto overflow-y-auto rounded-md h-full">
        <table className="w-full table-fixed text-xs text-center">
          <thead className="bg-indigo-950 text-white font-semibold">
            <tr>
              <th scope="col" className="px-2 py-3 w-[10%]">
                STT
              </th>
              <th scope="col" className="px-2 py-3 w-[30%]">
                Điểm quảng cáo
              </th>
              <th scope="col" className="px-2 py-3 w-[35%]">
                Thông tin thêm
              </th>
              <th scope="col" className="px-2 py-3 w-[15%]">
                Loại yêu cầu
              </th>
              <th scope="col" className="px-2 py-3 w-[10%]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(requestData) ? (
              requestData.length > 0 ? (
                slicePaginationData<displayDataType>(
                  requestData,
                  paginationData.currentPage,
                  paginationData.maxPage,
                  paginationData.maxElementPerPage
                ).map((request, requestIndex) => (
                  <tr
                    className="py-4 even:bg-gray-100"
                    key={`request@${request.id}`}
                  >
                    <TableRow
                      listData={[
                        request.id + 1,
                        <span>
                          <span className="line-clamp-2">
                            {request.pointData.address}
                          </span>
                          <button className="w-full text-center hover:underline">
                            <span className="line-clamp-1 font-medium text-xs ">
                              <b>Lat:</b>{' '}
                              <span className="text-blue-600">
                                {request.pointData.latitude}
                              </span>
                            </span>
                            <span className="line-clamp-1 font-medium text-xs ">
                              <b>Long:</b>{' '}
                              <span className="text-blue-600">
                                {request.pointData.latitude}
                              </span>
                            </span>
                          </button>
                        </span>,
                        request.requestTypes === REQUEST_TYPES.MOD ? (
                          <span className="line-clamp-4">
                            {request.reasonsData.trim().length > 0
                              ? request.reasonsData
                              : 'Không có'}
                          </span>
                        ) : request.additionData ? (
                          <span>
                            <span className="line-clamp-1">
                              <b>Công ty:</b> {request.additionData.companyName}
                            </span>
                            <span className="line-clamp-2">
                              <b>Địa chỉ:</b> {request.additionData.address}
                            </span>
                            <span className="line-clamp-1">
                              <b>Điện thoại:</b> {request.additionData.phone}
                            </span>
                            <span className="line-clamp-3">
                              <b>Thời hạn hợp đồng:</b>
                              <br />
                              <span
                                className={
                                  isDateGreaterThan(
                                    getCurrentDateTime(),
                                    request.additionData.contractEnd
                                  )
                                    ? 'text-green-600'
                                    : 'text-rose-600'
                                }
                              >
                                <b>
                                  {
                                    formatDate(
                                      new Date(
                                        request.additionData.contractStart
                                      )
                                    ).time24
                                  }
                                  &nbsp;|&nbsp;
                                  {
                                    formatDate(
                                      new Date(
                                        request.additionData.contractStart
                                      )
                                    ).dateMonthYear
                                  }
                                  <i className="fi fi-rr-arrow-small-right mx-2"></i>
                                  {
                                    formatDate(
                                      new Date(request.additionData.contractEnd)
                                    ).time24
                                  }
                                  &nbsp;|&nbsp;
                                  {
                                    formatDate(
                                      new Date(request.additionData.contractEnd)
                                    ).dateMonthYear
                                  }
                                </b>
                              </span>
                            </span>
                          </span>
                        ) : (
                          <></>
                        ),
                        <span
                          className={
                            request.requestTypes === REQUEST_TYPES.CRE
                              ? 'text-green-600 font-semibold'
                              : 'text-blue-600 font-semibold'
                          }
                        >
                          {request.requestTypes}
                        </span>,
                        <IconButton
                          type="button"
                          shape="square"
                          callback={() => {
                            router.push(
                              (request.requestTypes === REQUEST_TYPES.MOD
                                ? HQ_PAGES.AD_MODIFICATION_REQUESTS
                                : HQ_PAGES.AD_APPROVE_REQUESTS) +
                              `?id=${request.id}`
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
              <RowLoader colNumber={5} />
            )}
          </tbody>
        </table>
        {paginationData.maxPage > 0 ? <Pagination /> : <></>}
      </div>
    </>
  );
}

export default AdRequestTable;
