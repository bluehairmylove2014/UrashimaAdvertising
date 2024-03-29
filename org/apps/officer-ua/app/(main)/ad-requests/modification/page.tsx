'use client';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';
import {
  IAdLocationDetail,
  IBreadcrumb,
} from '@business-layer/services/entities';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import { HQ_PAGES } from '@constants/hqPages';
import { useGetAllAdModificationRequest } from '@business-layer/business-logic/lib/approve/process/hooks';
import { useGetOfficerAdDetail } from '@business-layer/business-logic/lib/officerAds/process/hooks';
import { IAdModificationRequest } from '@business-layer/services/entities/request';
import { formatDate } from '@utils/helpers';
import CommonLoader from '@presentational/atoms/CommonLoader';
import { useNavigateLoader } from '@presentational/atoms/NavigateLoader';

function ModificationRequestDetail() {
  const { get: getId } = useSearchParams();
  const requestId = getId('id');
  const { isActive, hideLoader } = useNavigateLoader();
  const { data: modificationRequests } = useGetAllAdModificationRequest();
  const { onGetOfficerAdDetail } = useGetOfficerAdDetail();
  const breadcrumbsData: IBreadcrumb[] = [
    {
      href: HQ_PAGES.AD_REQUESTS,
      label: 'Các yêu cầu từ Phường, Quận',
      isCurrent: false,
    },
    {
      href: HQ_PAGES.AD_MODIFICATION_REQUESTS + `?id=${requestId}`,
      label: 'Chi tiết yêu cầu chỉnh sửa',
      isCurrent: true,
    },
  ];
  const [requestData, setRequestData] = useState<IAdModificationRequest | null>(
    null
  );
  const [adDetailData, setAdDetailData] = useState<IAdLocationDetail | null>(
    null
  );

  useEffect(() => {
    if (isActive) {
      hideLoader();
    }
  }, [hideLoader, isActive]);
  useEffect(() => {
    if (requestId && modificationRequests) {
      const id = Number.parseInt(requestId);
      const request = modificationRequests.find((r) => r.id === id) ?? null;
      !requestData && setRequestData(request);

      if (request) {
        onGetOfficerAdDetail(request.adsPointId)
          .then((data) => setAdDetailData(data))
          .catch((error) => console.error(error));
      } else {
        console.error('Cannot found request');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modificationRequests, requestId]);

  return (
    <main className="container mx-auto px-4 py-12 h-screen overflow-y-auto scrollbar-hide">
      {requestData && adDetailData ? (
        <>
          {' '}
          <div className="flex flex-row justify-between items-start ">
            <HQPageTitle
              title="Chi tiết yêu cầu chỉnh sửa"
              breadcrumbsData={breadcrumbsData}
            />
          </div>
          <h3>Thông tin chung</h3>
          <p>
            <b>Thời điểm chỉnh sửa:</b>&nbsp;
            <span>
              {formatDate(new Date(requestData.modifyTime)).time24}
              &nbsp;ngày&nbsp;
              {formatDate(new Date(requestData.modifyTime)).dateMonthYear}
            </span>
          </p>
          <p>
            <b>Lý do:</b>&nbsp;<span>{requestData.reasons}</span>
          </p>
          <hr className="my-8" />
          <h3 className="text-blue-600 mb-4">SAU KHI THAY ĐỔI</h3>
          <DisplayAdDetail adData={{ ...requestData, isEmpty: false }} />
          <hr className="my-8" />
          <h3 className="text-rose-600 mb-4">TRƯỚC KHI THAY ĐỔI</h3>
          <DisplayAdDetail adData={adDetailData} />
        </>
      ) : (
        <CommonLoader />
      )}
    </main>
  );
}

export default ModificationRequestDetail;
