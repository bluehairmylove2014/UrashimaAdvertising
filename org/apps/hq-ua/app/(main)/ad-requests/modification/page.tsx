'use client';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';
import {
  IAdLocationDetail,
  IBreadcrumb,
} from '@business-layer/services/entities';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HQPageTitle from '@presentational/molecules/HQPageTitle';
import { HQ_PAGES } from '@constants/hqPages';
import {
  useApproveAdModificationRequest,
  useGetAllAdModificationRequest,
} from '@business-layer/business-logic/lib/approve/process/hooks';
import CustomButton from '@presentational/atoms/CustomButton';
import { useGetOfficerAdDetail } from '@business-layer/business-logic/lib/officerAds/process/hooks';
import { IAdModificationRequest } from '@business-layer/services/entities/request';
import { formatDate } from '@utils/helpers';
import CommonLoader from '@presentational/atoms/CommonLoader';
import { useNotification } from '@presentational/atoms/Notification';

async function ModificationRequestDetail() {
  const { get: getId } = useSearchParams();
  const requestId = getId('id');
  const modificationRequests = useGetAllAdModificationRequest();
  const { onApproveAdModificationRequest, isLoading } =
    useApproveAdModificationRequest();
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
  const { showError, showSuccess } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (requestId && modificationRequests) {
      const id = Number.parseInt(requestId);
      !requestData &&
        setRequestData(modificationRequests.find((r) => r.id === id) ?? null);

      onGetOfficerAdDetail(id)
        .then((data) => setAdDetailData(data))
        .catch((error) => console.error(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modificationRequests, requestId]);

  const handleApprove = () => {
    if (requestData) {
      onApproveAdModificationRequest({ id: requestData.id })
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
        <div className="w-28">
          <CustomButton
            style="fill-green"
            type="button"
            loading={isLoading}
            onClick={handleApprove}
          >
            <i className="fi fi-sr-badge-check mr-2"></i>
            Cấp phép
          </CustomButton>
        </div>
      </div>

      {requestData ? (
        <>
          <h3>Thông tin chung</h3>
          <button className="w-fit text-left hover:underline">
            <span className="line-clamp-1 font-medium text-xs ">
              <b>Kinh Độ:</b>{' '}
              <span className="text-blue-600">{requestData.latitude}</span>
            </span>
            <span className="line-clamp-1 font-medium text-xs ">
              <b>Vĩ Độ:</b>{' '}
              <span className="text-blue-600">{requestData.latitude}</span>
            </span>
          </button>
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
          <DisplayAdDetail adData={requestData} />
        </>
      ) : (
        <CommonLoader />
      )}
      <hr className="my-8" />
      <h3 className="text-rose-600 mb-4">TRƯỚC KHI THAY ĐỔI</h3>
      {adDetailData ? (
        <DisplayAdDetail adData={adDetailData} />
      ) : (
        <CommonLoader />
      )}
    </main>
  );
}

export default ModificationRequestDetail;
