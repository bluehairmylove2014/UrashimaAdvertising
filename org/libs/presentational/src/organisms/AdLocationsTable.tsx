'use client';

import { useGetAllOfficerAdsFromContext } from '@business-layer/business-logic/lib/officerAds/process/hooks';
import EmptyIcon from '@presentational/atoms/EmptyIcon';
import RowLoader from '@presentational/atoms/RowLoader';
import Pagination from '@presentational/molecules/Pagination';
import { calculateMaxPage, slicePaginationData } from '@utils/helpers';
import { useEffect } from 'react';
import {
  useGetPagination,
  useSetPaginationData,
} from '@business-layer/business-logic/non-service-lib/pagination';
import TableRow from '@presentational/molecules/TableRow';
import IconButton from '@presentational/atoms/IconButton';
import { useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';
import { IAdLocation } from '@business-layer/services/entities';
import { useNavigateLoader } from '@presentational/atoms/NavigateLoader';

const START_PAGE = 1;
const MAX_ELEMENT_PER_PAGE = 6;

type additionFuncParamsType = {
  isChoosing?: boolean;
  onChoosing?: (locationData: IAdLocation) => void;
  customDetailHref?: string;
};

function AdLocationsTable({
  isChoosing,
  onChoosing,
  customDetailHref,
}: additionFuncParamsType) {
  const router = useRouter();
  const officerAdData = useGetAllOfficerAdsFromContext();
  const { setPaginationData } = useSetPaginationData();
  const paginationData = useGetPagination();
  const { showLoader } = useNavigateLoader();

  useEffect(() => {
    if (Array.isArray(officerAdData)) {
      setPaginationData({
        currentPage: START_PAGE,
        maxPage: calculateMaxPage(officerAdData, MAX_ELEMENT_PER_PAGE),
        maxElementPerPage: MAX_ELEMENT_PER_PAGE,
        dataLength: officerAdData.length,
      });
    }
  }, [officerAdData]);

  return (
    <div className="shadow-sm overflow-x-auto overflow-y-hidden rounded-md">
      <table className="w-full table-fixed text-xs text-center">
        <thead className="bg-indigo-950 text-white font-semibold">
          <tr>
            <th scope="col" className="px-2 py-3 w-[10%]">
              STT
            </th>
            <th scope="col" className="px-2 py-3 w-[30%]">
              Địa Điểm
            </th>
            <th scope="col" className="px-2 py-3 w-[10%]">
              Quy Hoạch
            </th>
            <th scope="col" className="px-2 py-3 w-[20%]">
              Loại Vị Trí
            </th>
            <th scope="col" className="px-2 py-3 w-[20%]">
              Hình Thức
            </th>
            <th scope="col" className="px-2 py-3 w-[10%]">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(officerAdData) ? (
            officerAdData.length > 0 ? (
              slicePaginationData<IAdLocation>(
                officerAdData,
                paginationData.currentPage,
                paginationData.maxPage,
                paginationData.maxElementPerPage
              ).map((ad, adIndex) => (
                <tr
                  className="py-4 even:bg-gray-100"
                  key={`adLocation@${ad.address}@${ad.id}`}
                >
                  <TableRow
                    listData={[
                      (adIndex + 1).toString(),
                      ad.address,
                      ad.planned ? (
                        <i className="fi fi-br-check text-red-600"></i>
                      ) : (
                        <i className="fi fi-br-cross text-red-600"></i>
                      ),
                      ad.locationType,
                      ad.adsForm,
                      isChoosing ? (
                        <button
                          className="bg-transparent border-solid border-2 border-green-600 rounded hover:bg-green-600 hover:text-white transition-colors text-[0.6rem] px-4 py-1"
                          type="button"
                          onClick={() => onChoosing && onChoosing(ad)}
                        >
                          Chọn
                        </button>
                      ) : (
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
                        </IconButton>
                      ),
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr className="py-4">
                <td colSpan={6} className="py-12">
                  <EmptyIcon label="Không tìm thấy địa điểm nào" />
                </td>
              </tr>
            )
          ) : (
            <RowLoader colNumber={6} />
          )}
        </tbody>
      </table>
      {paginationData.maxPage > 0 ? <Pagination /> : <></>}
    </div>
  );
}

export default AdLocationsTable;
