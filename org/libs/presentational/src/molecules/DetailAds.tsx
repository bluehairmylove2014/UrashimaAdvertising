'use-client';
import CustomImage from '@presentational/atoms/CustomImage';
import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IAdLocationDetail } from '@business-layer/services/entities/ads';
import { useGetAdReports } from '@business-layer/business-logic/lib/report';
import { IAdReport } from '@business-layer/services/entities';
import { formatDate } from '@utils/helpers';


const convertDate = (date?: string) => {
  if (!date) return 'Error';
  const dateConvert = date.split('-');
  return dateConvert[2] + '/' + dateConvert[1] + '/' + dateConvert[0];
};
function DetailAdsPoint({
  adsPoint,
  id,
  isOfficer,
  handleDetailReportAdsBoard,
  handleClose,
  handleBack,
}: {
  adsPoint: IAdLocationDetail;
  id: number;
  isOfficer: boolean;
  handleDetailReportAdsBoard: (adsBoard: IAdReport) => void
  handleClose: () => void;
  handleBack: () => void;
}) {
  const adsBoardDetail = adsPoint.adsBoard.find((ads) => (ads.id = id));
  const adsReportList = useGetAdReports();
  const reportReported = adsReportList?.find((report) => report.adsBoardID === adsBoardDetail?.id && report.adsPointID === adsPoint?.id);

  return (
    <div
      className="h-[100%] w-[25%] shadow-md min-w-[45vh] fixed z-40"
      style={{ left: 0, top: 0 }}
    >
      <div className="h-[100%] w-[100%] bg-white relative overflow-y-scroll scrollbar">
        <div className="absolute z-10 top-0 right-0 mt-2 mx-1">
          <CustomButtonIcon
            widthIcon="0.6rem"
            heightIcon="0.6rem"
            type="button"
            bgColor="bg-black/70"
            round={5}
            padding={8}
            pathImage="/assets/close.png"
            alt=""
            onClick={handleClose}
          >
            {' '}
          </CustomButtonIcon>
        </div>
        <div className="absolute top-0 left-0 z-10 mt-2 mx-1">
          <CustomButtonIcon
            widthIcon="0.7rem"
            heightIcon="0.7rem"
            type="button"
            pathImage="/assets/undo.png"
            alt=""
            border={1}
            colorBorder="blue"
            round={4}
            onClick={handleBack}
          >
            {' '}
          </CustomButtonIcon>
        </div>

        <div className="w-[100%] h-[30vh]">
          {adsBoardDetail?.image &&
            <CustomImage
              src={adsBoardDetail?.image}
              alt="location"
              width="100%"
              height="100%"
            />
          }
        </div>

        <h3 className="my-3 mx-3">{adsBoardDetail?.adsType}</h3>

        {/* two button for adspoint */}
        {isOfficer ?
          <>
          </>
          :

          <>
            {reportReported !== undefined ?
              <div className='mx-2 mb-3'>
                <CustomButtonIcon
                  widthIcon="0.7rem"
                  heightIcon="0.7rem"
                  round={2}
                  type="button"
                  border={1}
                  colorBorder="green"
                  pathImage="/assets/detailReport.png"
                  alt=""
                  onClick={() => handleDetailReportAdsBoard(reportReported)}
                >
                  <span className="text-green-600 text-[0.65rem] text-medium ml-1">
                    CHI TIẾT BÁO CÁO
                  </span>
                </CustomButtonIcon>
              </div>
              :
              <div className="flex my-3 mx-2">
                <span className="ml-1"></span>
                <CustomButtonIcon
                  widthIcon="0.8rem"
                  heightIcon="0.8rem"
                  round={2}
                  type="button"
                  border={1}
                  colorBorder="rose"
                  pathImage="/assets/report.png"
                  alt=""
                >
                  <span className="text-rose-600 text-[0.6rem] text-bold">
                    BÁO CÁO VI PHẠM
                  </span>
                </CustomButtonIcon>
              </div>}

          </>
        }


        <hr className="mx-2"></hr>
        {/* Information advertisement point */}
        <div className="mx-3 my-4">
          {/* Address */}
          <div className="flex flex-row items-start">
            <div className="h-[100%]">
              <CustomImage
                src="/assets/addressAdsPoint.png"
                alt="address"
                width="0.8rem"
                height="0.8rem"
              />
            </div>

            <p className="text-[0.7rem] text-neutral-700 ml-2">
              {' '}
              Địa điểm:
              <span className="font-semibold"> {adsPoint.address}</span>
            </p>
          </div>

          {/* Size */}
          <div className="flex mt-3 flex-row items-start">
            <div className="h-[100%]">
              <CustomImage
                src="/assets/size.png"
                alt="address"
                width="0.8rem"
                height="0.8rem"
              />
            </div>

            <p className="text-[0.7rem] text-neutral-700 ml-2">
              {' '}
              Kích thước:
              <span className="font-semibold">
                {' '}
                {adsBoardDetail?.width}m x {adsBoardDetail?.height}m
              </span>
            </p>
          </div>

          {/* Ads Form */}
          <div className="flex mt-3 flex-row items-start">
            <CustomImage
              src="/assets/adsForm.png"
              alt="Ads Form"
              width="0.8rem"
              height="0.8rem"
            />

            <p className="text-[0.7rem] text-neutral-700 ml-2">
              {' '}
              Hình thức:
              <span className="font-semibold"> {adsPoint.adsForm}</span>
            </p>
          </div>

          {/* Location Type */}
          <div className="flex mt-3 flex-row items-start">
            <CustomImage
              src="/assets/locationType.png"
              alt="location"
              width="0.8rem"
              height="0.8rem"
            />
            <p className="text-[0.7rem] text-neutral-700 ml-2">
              {' '}
              Phân loại:
              <span className="font-semibold"> {adsPoint.locationType}</span>
            </p>
          </div>
        </div>

        <hr className="mx-2 "></hr>
        <div className="mx-3 mt-4">
          <p className="text-[0.8rem] text-neutral-600">
            {adsPoint.planned ? (
              <span className="font-bold text-green-700">ĐÃ QUY HOẠCH</span>
            ) : (
              <span className="font-bold text-rose-600">CHƯA QUY HOẠCH</span>
            )}
          </p>
          <p className="text-[0.8rem] text-neutral-700 mt-2">
            {' '}
            Ngày hết hạn hợp đồng:
            <span className="font-bold text-rose-600 ml-1">
              {adsBoardDetail?.expiredDate
                ? formatDate(new Date(adsBoardDetail.expiredDate)).dateMonthYear
                : 'N/A'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailAdsPoint;