'use client';

import { useGetAllOfficerAdsFromContext } from '@business-layer/business-logic/lib/officerAds/process/hooks';
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
import { useNavigateLoader } from '@presentational/atoms/NavigateLoader';
import { useFetchAllOfficerAdBoard } from '@business-layer/business-logic/lib/officerAds';
import Image from 'next/image';
import { debounce } from '@business-layer/business-logic/helper';
import ModernSelect, {
  modernSelectOptionType,
} from '@presentational/atoms/ModernSelect';

const START_PAGE = 1;
const MAX_ELEMENT_PER_PAGE = 4;

type additionFuncParamsType = {
  customDetailHref?: string;
};

const TIME_OPTIONS: modernSelectOptionType[] = [
  {
    name: 'Tất cả tình trạng',
    value: null,
    defaultChecked: true,
  },
  {
    name: 'Đã quá hạn',
    value: 'out',
    defaultChecked: false,
  },
  {
    name: 'Còn hoạt động',
    value: 'in',
    defaultChecked: false,
  },
];
const AD_BOARD_TYPE_OPTIONS: modernSelectOptionType[] = [
  {
    name: 'Tất cả loại bảng',
    value: null,
    defaultChecked: true,
  },
  {
    name: 'Trụ bảng hiflex',
    value: 'Trụ bảng hiflex',
    defaultChecked: false,
  },
  {
    name: 'Trụ màn hình điện tử LED',
    value: 'Trụ màn hình điện tử LED',
    defaultChecked: false,
  },
  {
    name: 'Trụ hộp đèn',
    value: 'Trụ hộp đèn',
    defaultChecked: false,
  },
  {
    name: 'Bảng hiflex ốp tường',
    value: 'Bảng hiflex ốp tường',
    defaultChecked: false,
  },
  {
    name: 'Màn hình điện tử ốp tường',
    value: 'Màn hình điện tử ốp tường',
    defaultChecked: false,
  },
  {
    name: 'Trụ treo băng rôn dọc',
    value: 'Trụ treo băng rôn dọc',
    defaultChecked: false,
  },
  {
    name: 'Trụ treo băng rôn ngang',
    value: 'Trụ treo băng rôn ngang',
    defaultChecked: false,
  },
  {
    name: 'Trụ/Cụm pano',
    value: 'Trụ/Cụm pano',
    defaultChecked: false,
  },
  {
    name: 'Cổng chào',
    value: 'Cổng chào',
    defaultChecked: false,
  },
  {
    name: 'Trung tâm thương mại',
    value: 'Trung tâm thương mại',
    defaultChecked: false,
  },
];

function AdBoardsTable({ customDetailHref }: additionFuncParamsType) {
  const router = useRouter();
  const { data: adBoardData } = useFetchAllOfficerAdBoard();
  const [displayedData, setDisplayedData] = useState(adBoardData);
  const [filterSetting, setFilterSetting] = useState<{
    time: null | string;
    type: null | string;
    key: null | string;
  }>({
    time: null,
    type: null,
    key: null,
  });
  const { setPaginationData } = useSetPaginationData();
  const paginationData = useGetPagination();
  const { showLoader } = useNavigateLoader();

  useEffect(() => {
    setDisplayedData(adBoardData);
  }, [adBoardData]);

  useEffect(() => {
    if (Array.isArray(displayedData)) {
      setPaginationData({
        currentPage: START_PAGE,
        maxPage: calculateMaxPage(displayedData, MAX_ELEMENT_PER_PAGE),
        maxElementPerPage: MAX_ELEMENT_PER_PAGE,
        dataLength: displayedData.length,
      });
    }
  }, [displayedData]);

  useEffect(() => {
    if (adBoardData) {
      setDisplayedData(
        adBoardData
          .filter((adBoard) => {
            // Filter by time
            if (filterSetting.time === null) return true;
            if (
              filterSetting.time === 'in' &&
              isDateGreaterThan(getCurrentDateTime(), adBoard.expiredDate)
            ) {
              return false;
            } else if (
              filterSetting.time === 'out' &&
              isDateGreaterThan(adBoard.expiredDate, getCurrentDateTime())
            ) {
              return false;
            }
            return true;
          })
          .filter(
            (adBoard) =>
              filterSetting.type === null ||
              adBoard.adsType === filterSetting.type
          )
          .filter(
            (adBoard) =>
              filterSetting.key === null ||
              adBoard.adsPoint.address
                .toLowerCase()
                .includes(filterSetting.key.toLowerCase())
          )
      );
    }
  }, [filterSetting.key, filterSetting.time, filterSetting.type]);

  const handleFilterByTime = ({ value }: modernSelectOptionType) => {
    setFilterSetting({
      ...filterSetting,
      time: value,
    });
  };

  const handleFilterByAdBoardType = ({ value }: modernSelectOptionType) => {
    setFilterSetting({
      ...filterSetting,
      type: value,
    });
  };

  const handleFilterBySearchKey = debounce((e: any) => {
    const value = e.target.value.trim();
    setFilterSetting({
      ...filterSetting,
      key: value.length > 0 ? value : null,
    });
  }, 500);

  return (
    <>
      <div className="flex flex-row gap-4 justify-between mb-8 w-full">
        <form className="flex-shrink w-96 relative border-solid border-[1px] border-zinc-400 rounded overflow-hidden">
          <i className="fi fi-rr-search absolute top-1/2 left-4 transform -translate-y-1/2 bottom-[4px] text-[0.65rem]"></i>
          <input
            name="searchBox"
            type="text"
            className="px-8 py-2 w-full text-[0.65rem] outline-none"
            placeholder="Tìm kiếm theo địa chỉ..."
            onChange={handleFilterBySearchKey}
          />
        </form>
        <div className="flex flex-row justify-end flex-grow gap-2">
          <ModernSelect
            onOptionSelect={handleFilterByTime}
            options={TIME_OPTIONS}
          />
          <ModernSelect
            onOptionSelect={handleFilterByAdBoardType}
            options={AD_BOARD_TYPE_OPTIONS}
          />
        </div>
      </div>
      <div className="shadow-sm overflow-x-auto overflow-y-hidden rounded-md">
        <table className="w-full table-fixed text-xs text-center">
          <thead className="bg-indigo-950 text-white font-semibold">
            <tr>
              <th scope="col" className="px-2 py-3 w-[10%]">
                STT
              </th>
              <th scope="col" className="px-2 py-3 w-[40%]">
                Thông tin
              </th>
              <th scope="col" className="px-2 py-3 w-[20%]">
                Loại Bảng
              </th>
              <th scope="col" className="px-2 py-3 w-[20%]">
                Hạn Hợp Đồng
              </th>
              <th scope="col" className="px-2 py-3 w-[10%]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(displayedData) ? (
              displayedData.length > 0 ? (
                slicePaginationData<any>(
                  displayedData,
                  paginationData.currentPage,
                  paginationData.maxPage,
                  paginationData.maxElementPerPage
                ).map((ad, adIndex) => (
                  <tr
                    className="py-4 even:bg-gray-100"
                    key={`adBoard@${ad.address}@${ad.id}`}
                  >
                    <TableRow
                      listData={[
                        (adIndex + 1).toString(),
                        <span className="flex flex-row gap-3 justify-center items-center">
                          <Image
                            src={ad.image}
                            alt={ad.adsPoint.address}
                            width={80}
                            height={80}
                          />
                          <span className="line-clamp-3">
                            {ad.adsPoint.address}
                          </span>
                        </span>,
                        ad.adsType,
                        <span
                          className={`font-medium ${
                            isDateGreaterThan(
                              ad.expiredDate,
                              getCurrentDateTime()
                            )
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {formatDate(new Date(ad.expiredDate)).time24} |{' '}
                          {formatDate(new Date(ad.expiredDate)).dateMonthYear}
                        </span>,
                        <IconButton
                          type="button"
                          shape="square"
                          callback={() => {
                            router.push(
                              (customDetailHref ??
                                OFFICER_PAGES.AD_LOCATION_DETAIL) + `/${ad.id}`
                            );
                            showLoader();
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
                  <td colSpan={5} className="py-12">
                    <EmptyIcon label="Không tìm thấy bảng nào" />
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

export default AdBoardsTable;
