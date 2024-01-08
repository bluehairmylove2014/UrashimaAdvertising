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
      <HQPageTitle title="Quản lý tài khoản" />

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
