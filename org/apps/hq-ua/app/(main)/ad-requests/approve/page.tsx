'use client';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';
import { IBreadcrumb } from '@business-layer/services/entities';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import { HQ_PAGES } from '@constants/hqPages';
import {
  useApproveAdCreationRequest,
  useGetAllCreationRequest,
} from '@business-layer/business-logic/lib/approve/process/hooks';
import CustomButton from '@presentational/atoms/CustomButton';
import { formatDate } from '@utils/helpers';
import CommonLoader from '@presentational/atoms/CommonLoader';
import { useNotification } from '@presentational/atoms/Notification';
import { IApprove } from '@business-layer/services/entities/approve';
import { CREATION_REQUEST_STATUS_LIST } from '@constants/requestStatus';

async function ApproveRequestDetail() {
  const { get: getId } = useSearchParams();
  const requestId = getId('id');
  const creationRequests = useGetAllCreationRequest();
  const { onApproveAdCreationRequest, isLoading } =
    useApproveAdCreationRequest();
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
  const { showError, showSuccess } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (requestId && creationRequests) {
      const id = Number.parseInt(requestId);
      !requestData &&
        setRequestData(creationRequests.find((r) => r.id === id) ?? null);
      console.log(creationRequests.find((r) => r.id === id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creationRequests, requestId]);

  const handleApprove = (status: string) => {
    if (requestData) {
      onApproveAdCreationRequest({
        id: requestData.id,
        status,
      })
        .then((msg) => {
          showSuccess(msg);
          router.push(HQ_PAGES.AD_REQUESTS);
        })
        .catch((error) => {
          showError(error.message);
        });
    } else {
      showError('Chờ 1 chút để lấy dữ liệu');
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 h-screen overflow-y-auto scrollbar-hide">
      <div className="flex flex-row justify-between items-start ">
        <HQPageTitle
          title="Chi tiết yêu cầu chỉnh sửa"
          breadcrumbsData={breadcrumbsData}
        />
        <div className="flex flex-row gap-2 flex-nowrap">
          <div className="w-28">
            <CustomButton
              style="fill-green"
              type="button"
              loading={isLoading}
              onClick={() => handleApprove(CREATION_REQUEST_STATUS_LIST.ACCEPT)}
            >
              <i className="fi fi-sr-badge-check mr-2"></i>
              Cấp phép
            </CustomButton>
          </div>
          <div className="w-28">
            <CustomButton
              style="fill-error"
              type="button"
              loading={isLoading}
              onClick={() => handleApprove(CREATION_REQUEST_STATUS_LIST.REJECT)}
            >
              Từ chối
            </CustomButton>
          </div>
        </div>
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
              adsBoard: [requestData.adsBoard],
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
