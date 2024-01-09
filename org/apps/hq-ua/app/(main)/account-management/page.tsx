'use client';
import { useGetAllAccount } from '@business-layer/business-logic/lib/account';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import { useEffect } from 'react';
import AccountCard from '@presentational/atoms/AccountCard';
import CommonLoader from '@presentational/atoms/CommonLoader';
import Pagination from '@presentational/molecules/Pagination';
import {
  useGetPagination,
  useSetPaginationData,
} from '@business-layer/business-logic/non-service-lib/pagination';
import { calculateMaxPage, slicePaginationData } from '@utils/helpers';
import { IAccountDetail } from '@business-layer/services/entities';
import Link from 'next/link';
import { HQ_PAGES } from '@constants/hqPages';

const START_PAGE = 1;
const MAX_ELEMENT_PER_PAGE = 5;

function AccountManagement() {
  const { data: accountData, refetch } = useGetAllAccount();
  const paginationData = useGetPagination();
  const { setPaginationData } = useSetPaginationData();

  useEffect(() => {
    if (Array.isArray(accountData)) {
      setPaginationData({
        currentPage: START_PAGE,
        maxPage: calculateMaxPage(accountData, MAX_ELEMENT_PER_PAGE),
        maxElementPerPage: MAX_ELEMENT_PER_PAGE,
        dataLength: accountData.length,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData]);

  return (
    <div className="py-6 w-full h-screen">
      <div className="flex flex-row justify-between items-center mb-8">
        <HQPageTitle title="Quản lý tài khoản" />
        <Link
          href={HQ_PAGES.NEW_ACCOUNT}
          className="px-4 py-2 rounded text-[0.65rem] font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
        >
          <i className="fi fi-sr-user-add mr-2"></i>
          Thêm mới tài khoản
        </Link>
      </div>

      <div className="w-full h-fit flex flex-col justify-start items-start gap-4">
        {accountData ? (
          <>
            {slicePaginationData<IAccountDetail>(
              accountData,
              paginationData.currentPage,
              paginationData.maxPage,
              paginationData.maxElementPerPage
            ).map((acc) => (
              <AccountCard
                accountData={acc}
                key={acc.id}
                handleRefetch={refetch}
              />
            ))}
          </>
        ) : (
          <CommonLoader />
        )}
      </div>
      {paginationData.maxPage > 0 ? <Pagination /> : <></>}
    </div>
  );
}

export default AccountManagement;
