'use-client';
import CustomImage from '@presentational/atoms/CustomImage';
import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';
import { IAdLocationDetail } from '@business-layer/services/entities/ads';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useSetReportForm } from '@business-layer/business-logic/non-service-lib/reportForm';
import {
  useGetAdReports,
  useGetLocationReports,
} from '@business-layer/business-logic/lib/report';
import { useRouter } from 'next/navigation';
import { OFFICER_PAGES } from '@constants/officerPages';

function DetailAdsPoint({
  detailAdsPoint,
  isOfficer,
  onClick,
  handleClose,
  handleDetailReport,
}: {
  detailAdsPoint: IAdLocationDetail;
  isOfficer: boolean;
  onClick: (id: number) => void;
  handleClose: () => void;
  handleDetailReport: () => void;
}) {
  const { setForm } = useSetReportForm();
  const router = useRouter();

  const adsReportList = useGetAdReports();
  const adsPointReportList = useGetLocationReports();

  return (
    <div
      className="h-[100vh] w-[25%] absolute shadow-md min-w-[45vh] z-40"
      style={{ left: 0, top: 0 }}
    >
      <div className="h-[100%] w-[100%] bg-white relative overflow-y-scroll scrollbar">
        {/* Close button */}
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

        {/* Image for ads point */}
        <Carousel showStatus={false} showThumbs={false}>
          {detailAdsPoint.images.map((data, index) => (
            <div className="w-[100%] h-[30vh]" key={`carousel@${index}`}>
              <CustomImage
                src={data.image}
                alt="location"
                width="100%"
                height="30vh"
              />
            </div>
          ))}
        </Carousel>

        {/* two button for adspoint */}
        {isOfficer ? (
          <>
            <div className="my-4 mx-5">
              <button
                className='bg-green-600 text-white rounded px-2 py-2 font-semibold hover:bg-green-500 transition-colors'
                onClick={() => {
                  router.push(
                    (OFFICER_PAGES.ADS_BOARD) + `/edit/${detailAdsPoint.id}`
                  );
                }}>
                <i className="fi fi-ss-file-edit mr-2"></i>
                <span className="text-xs">Chỉnh sửa</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 mx-5">
              {adsPointReportList?.find(
                (report) =>
                  report.longitude === detailAdsPoint.longitude &&
                  report.latitude === detailAdsPoint.latitude
              ) !== undefined ? (
                <>
                  <p className="mb-1 text-rose-600 font-bold text-sm">
                    Bạn đã báo cáo điểm này
                  </p>
                  <CustomButtonIcon
                    widthIcon="0.7rem"
                    heightIcon="0.7rem"
                    round={2}
                    type="button"
                    border={1}
                    colorBorder="green"
                    pathImage="/assets/detailReport.png"
                    alt=""
                    onClick={handleDetailReport}
                  >
                    <span className="text-green-600 text-[0.65rem] text-medium ml-1">
                      CHI TIẾT BÁO CÁO
                    </span>
                  </CustomButtonIcon>
                </>
              ) : (
                <CustomButtonIcon
                  widthIcon="0.8rem"
                  heightIcon="0.8rem"
                  round={2}
                  type="button"
                  border={1}
                  colorBorder="rose"
                  pathImage="/assets/report.png"
                  alt=""
                  onClick={() => {
                    setForm({
                      isReportFormActive: true,
                      reportTarget: 'LOCATION',
                      reportData: detailAdsPoint,
                      reportIdentificationData: {
                        latitude: detailAdsPoint.latitude,
                        longitude: detailAdsPoint.longitude,
                      },
                    });
                  }}
                >
                  <span className="text-rose-600 text-[0.6rem] text-bold ml-1">
                    BÁO CÁO VI PHẠM
                  </span>
                </CustomButtonIcon>
              )}
            </div>
            <hr className="my-4 mx-2"></hr>
          </>
        )}

        {/* Information advertisement point */}
        <div className="mx-5">
          <div className="flex justify-between items-center text-[0.8rem]">
            <p className="font-semibold text-sky-500">Tổng quan</p>
            {/* isPlanned */}
            <p className="font-bold text-green-600 italic">
              {' '}
              {detailAdsPoint.planned}
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

            <p className="text-[0.7rem] text-neutral-500 ml-2">
              {' '}
              Hình thức:
              <span className="font-semibold"> {detailAdsPoint.adsForm} </span>
            </p>
          </div>

          {/* Address */}
          <div className="flex mt-3 flex-row items-start">
            <div className="h-[100%]">
              <CustomImage
                src="/assets/addressAdsPoint.png"
                alt="address"
                width="0.8rem"
                height="0.8rem"
              />
            </div>
            <p className="text-[0.7rem] text-neutral-500 ml-2">
              {' '}
              Địa điểm:
              <span className="font-semibold"> {detailAdsPoint.address}</span>
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

            <p className="text-[0.7rem] text-neutral-500 ml-2">
              {' '}
              Phân loại:
              <span className="font-semibold">
                {' '}
                {detailAdsPoint.locationType}
              </span>
            </p>
          </div>
        </div>

        <hr className="mx-2 my-4"></hr>
        {/* Title and filter for ads list */}
        <div className="flex justify-between mx-5 mb-3">
          <div className="flex justify-center items-center">
            <span className="ml-1 text-[0.8rem] font-semibold text-sky-500">
              Danh sách bảng quảng cáo
            </span>
          </div>
        </div>

        {/* Design box for each ads */}
        {detailAdsPoint.adsBoard.map((ads) => (
          <div
            className=" mx-5 mb-3 cursor-pointer"
            onClick={() => onClick(ads.id)}
            key={ads.id}
          >
            <div className="w-[100%] p-2 mb-4 border border-1 border-gray-300 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <p className="text-sm font-bold text-neutral-800">
                  {ads.adsType} {ads.id}
                </p>
                {/* <CustomButtonIcon
                  widthIcon="1rem"
                  heightIcon="1rem"
                  type="button"
                  pathImage="/assets/save.png"
                  alt=""
                >
                  {' '}
                </CustomButtonIcon> */}

                {adsReportList?.find(
                  (report) =>
                    report.adsBoardID === ads.id &&
                    report.adsPointID === detailAdsPoint.id
                ) !== undefined ? (
                  <></>
                ) : (
                  <>
                    {isOfficer ? (
                      <></>
                    ) : (
                      <button
                        className="border-solid border-red-500 border-[1px] text-red-500 rounded text-[0.65rem] w-5 h-5 bg-white overflow-hidden hover:bg-red-500 hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setForm({
                            isReportFormActive: true,
                            reportTarget: 'AD',
                            reportData: ads,
                            reportIdentificationData: {
                              adsBoardID: ads.id,
                              adsPointID: detailAdsPoint.id,
                            },
                          });
                        }}
                      >
                        <i className="fi fi-ss-triangle-warning"></i>
                      </button>
                    )}
                  </>
                )}
              </div>
              <p className="text-[0.65rem] font-medium text-gray-500">
                {detailAdsPoint.address}
              </p>
              <hr />
              <div className="flex my-3">
                <div className="rounded overflow-hidden">
                  <CustomImage
                    src={ads.image}
                    alt="ads"
                    width="12vh"
                    height="100%"
                  />
                </div>

                <span className="ml-2 font-medium">
                  <p className="text-[0.65rem] text-neutral-700">
                    Kích thước:
                    <span className="font-bold">
                      {' '}
                      {ads.width}m x {ads.height}m
                    </span>
                  </p>

                  <p className=" text-[0.65rem] text-neutral-700">
                    Hình thức:
                    <span className="font-bold"> {detailAdsPoint.adsForm}</span>
                  </p>
                  <p className="text-[0.65rem] text-neutral-700">
                    Phân loại:
                    <span className="font-bold ">
                      {' '}
                      {detailAdsPoint.locationType}
                    </span>
                  </p>
                </span>
              </div>

              {adsReportList?.find(
                (report) =>
                  report.adsBoardID === ads.id &&
                  report.adsPointID === detailAdsPoint.id
              ) !== undefined ? (
                <>
                  <hr className="my-2"></hr>
                  <div className="flex justify-between">
                    <div></div>
                    <div className="flex">
                      <i className="fi fi-sr-diamond-exclamation text-rose-600"></i>
                      <p className="text-rose-600 font-bold text-[0.7rem] text-right ml-1">
                        Bảng quảng cáo bị báo cáo
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailAdsPoint;
