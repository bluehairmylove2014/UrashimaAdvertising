'use client';

import { useGetAllOfficerAdsFromContext } from '@business-layer/business-logic/lib/officerAds/process/hooks';
import { IAdLocation } from '@business-layer/services/entities';
import EmptyIcon from '@presentational/atoms/EmptyIcon';
import RowLoader from '@presentational/atoms/RowLoader';
import Pagination from '@presentational/molecules/Pagination';
import { calculateMaxPage, slicePaginationData } from '@utils/helpers';
import { useEffect, useState } from 'react';
import {
  useGetPagination,
  useInitPagination,
} from '@business-layer/business-logic/non-service-lib/pagination';
import TableRow from '@presentational/molecules/TableRow';
import IconButton from '@presentational/atoms/IconButton';
import { useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';

const START_PAGE = 1;
const MAX_ELEMENT_PER_PAGE = 6;

function AdLocationsTable() {
  const router = useRouter();
  const officerAdData = useGetAllOfficerAdsFromContext();
  const [displayedAdData, setDisplayedAdData] = useState<IAdLocation[] | null>(
    null
  );
  const { initPagination } = useInitPagination();
  const [paginationId, setPaginationId] = useState<number | null>(null);
  const paginationVersion = useGetPagination(paginationId || -1);

  useEffect(() => {
    if (Array.isArray(officerAdData)) {
      setPaginationId(
        initPagination({
          currentPage: START_PAGE,
          maxPage: calculateMaxPage(officerAdData, MAX_ELEMENT_PER_PAGE),
          maxElementPerPage: MAX_ELEMENT_PER_PAGE,
          dataLength: officerAdData.length,
        })
      );
    }
  }, [officerAdData]);

  useEffect(() => {
    if (officerAdData && paginationVersion) {
      setDisplayedAdData(
        slicePaginationData(
          officerAdData,
          paginationVersion.data.currentPage,
          paginationVersion.data.maxPage,
          paginationVersion.data.maxElementPerPage
        )
      );
    }
  }, [paginationVersion?.data.currentPage]);

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
            <th scope="col" className="px-2 py-3 w-[20%]">
              Loại Vị Trí
            </th>
            <th scope="col" className="px-2 py-3 w-[20%]">
              Hình Thức
            </th>
            <th scope="col" className="px-2 py-3 w-[10%]">
              Quy Hoạch
            </th>
            <th scope="col" className="px-2 py-3 w-[10%]">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(displayedAdData) ? (
            displayedAdData.length > 0 ? (
              displayedAdData.map((ad, adIndex) => (
                <tr
                  className="py-4 even:bg-gray-100"
                  key={`adLocation@${adIndex}`}
                >
                  <TableRow
                    listData={[
                      (adIndex + 1).toString(),
                      ad.address,
                      ad.locationType,
                      ad.adsForm,
                      ad.planned ? (
                        <i className="fi fi-br-check text-red-600"></i>
                      ) : (
                        <i className="fi fi-br-cross text-red-600"></i>
                      ),
                      <IconButton
                        type="button"
                        shape="square"
                        callback={() => {
                          router.push(OFFICER_PAGES.ADS_BOARD + `/${ad.id}`);
                        }}
                      >
                        <i className="fi fi-sr-file-circle-info text-blue-600 text-sm hover:text-blue-400 transition-colors"></i>
                      </IconButton>,
                    ]}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <EmptyIcon />
              </tr>
            )
          ) : (
            <RowLoader colNumber={6} />
          )}
        </tbody>
      </table>
      {typeof paginationId === 'number' && paginationId > 0 ? (
        <Pagination id={paginationId} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default AdLocationsTable;
