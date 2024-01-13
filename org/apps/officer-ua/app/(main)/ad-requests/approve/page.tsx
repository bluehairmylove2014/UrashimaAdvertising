'use client';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';
import { IBreadcrumb } from '@business-layer/services/entities';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import { HQ_PAGES } from '@constants/hqPages';
import { useGetAllCreationRequest } from '@business-layer/business-logic/lib/approve/process/hooks';
import { formatDate } from '@utils/helpers';
import CommonLoader from '@presentational/atoms/CommonLoader';
import { IApprove } from '@business-layer/services/entities/approve';

async function ApproveRequestDetail() {
  const { get: getId } = useSearchParams();
  const requestId = getId('id');
  const { data: creationRequests } = useGetAllCreationRequest();
  const breadcrumbsData: IBreadcrumb[] = [
    {
      href: HQ_PAGES.AD_REQUESTS,
      label: 'Các yêu cầu từ Phường, Quận',
      isCurrent: false,
    },
    {
      href: HQ_PAGES.AD_APPROVE_REQUESTS + `?id=${requestId}`,
      label: 'Chi tiết yêu cầu cấp phép',
      isCurrent: true,
    },
  ];
  const [requestData, setRequestData] = useState<IApprove | null>(null);

  useEffect(() => {
    if (requestId && creationRequests) {
      const id = Number.parseInt(requestId);
      !requestData &&
        setRequestData(creationRequests.find((r) => r.id === id) ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creationRequests, requestId]);

  return (
    <main className="container mx-auto px-4 py-12 h-screen overflow-y-auto scrollbar-hide">
      <div className="flex flex-row justify-between items-start ">
        <HQPageTitle
          title="Chi tiết yêu cầu chỉnh sửa"
          breadcrumbsData={breadcrumbsData}
        />
      </div>

      {requestData ? (
        <>
          <p>
            <b>Tên công ty:</b>&nbsp;
            <span>{requestData.companyName}</span>
          </p>
          <p>
            <b>Email:</b>&nbsp;
            <span>{requestData.email}</span>
          </p>
          <p>
            <b>Số điện thoại:</b>&nbsp;
            <span>{requestData.phone}</span>
          </p>
          <p>
            <b>Thời hạn hợp đồng:</b>&nbsp;
            <span>
              {formatDate(new Date(requestData.contractStart)).time24}
              &nbsp;&nbsp;ngày&nbsp;&nbsp;
              {formatDate(new Date(requestData.contractStart)).dateMonthYear}
              <span className="mx-2">đến</span>
              {formatDate(new Date(requestData.contractEnd)).time24}
              &nbsp;&nbsp;ngày&nbsp;&nbsp;
              {formatDate(new Date(requestData.contractEnd)).dateMonthYear}
            </span>
          </p>
          <p>
            <b>Tóm tắt nội dung quảng cáo:</b>&nbsp;
            <span>{requestData.adsContent}</span>
          </p>
          <hr className="my-3" />
          <h4 className="mb-3">Chi tiết quảng cáo</h4>
          <DisplayAdDetail
            adData={{
              ...requestData.adsPoint,
              adsBoard: requestData.adsBoard ? [requestData.adsBoard] : [],
              images: [],
            }}
          />
        </>
      ) : (
        <CommonLoader />
      )}
    </main>
  );
}

export default ApproveRequestDetail;
