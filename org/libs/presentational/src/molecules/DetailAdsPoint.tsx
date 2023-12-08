'use-client';
import CustomImage from '@presentational/atoms/CustomImage';
import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';
import { IAdsDetail } from '@business-layer/services/entities/ads';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useSetReportForm } from '@business-layer/business-logic/lib/reportForm';

function DetailAdsPoint({
  detailAdsPoint,
  onClick,
}: {
  detailAdsPoint: IAdsDetail;
  onClick: (id: number) => void;
}) {
  const { setForm } = useSetReportForm();
  return (
    <div
      className="h-[100%] w-[25%] shadow-md min-w-[45vh] fixed"
      style={{ left: 0, top: 0 }}
    >
      <div className="h-[100%] w-[100%] bg-white relative overflow-y-scroll scrollbar">
        {/* Image for ads point */}
        <Carousel showStatus={false} showThumbs={false}>
          {detailAdsPoint.images.map((data, index) => (
            <div className="w-[100%] h-[30vh]" key={`carousel@${index}`}>
              <CustomImage
                src="/assets/billboardExample.png"
                alt="location"
                width="100%"
                height="30vh"
              />
            </div>
          ))}
        </Carousel>

        {/* two button for adspoint */}
        <div className="flex my-4 mx-2">
          {/* <CustomButtonIcon
            widthIcon="0.9rem"
            heightIcon="0.9rem"
            type="button"
            pathImage="/assets/save.png"
            border={1}
            round={2}
            colorBorder="green"
            alt=""
          >
            <span className="text-green-600 text-[0.6rem] text-bold ml-1">
              LƯU
            </span>
          </CustomButtonIcon> */}

          <span className="ml-2"></span>
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
                reportAdditionData: {
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
        </div>

        <hr className="my-4 mx-2"></hr>
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
            <div className="w-[100%]  p-2 mb-4 border border-1 border-gray-300 rounded-lg hover:shadow-md transition-shadow">
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
                <button
                  className="border-solid border-red-500 border-[1px] text-red-500 rounded text-[0.65rem] w-5 h-5 bg-white overflow-hidden hover:bg-red-500 hover:text-white transition-colors"
                  onClick={() => {
                    setForm({
                      isReportFormActive: true,
                      reportTarget: 'AD',
                      reportAdditionData: {
                        adsBoardID: ads.id,
                        adsPointID: detailAdsPoint.id,
                      },
                    });
                  }}
                >
                  <i className="fi fi-ss-triangle-warning"></i>
                </button>
              </div>
              <p className="text-[0.65rem] font-medium text-gray-500">
                {detailAdsPoint.address}
              </p>
              <hr />
              <div className="flex my-3">
                <div className="rounded overflow-hidden">
                  <CustomImage
                    src="/assets/billboardExample.png"
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

              {/* Two button */}
              <div className="flex justify-between mt-2">
                {/* <CustomButtonIcon
                  widthIcon="0.9rem"
                  heightIcon="0.9rem"
                  type="button"
                  pathImage="/assets/detail.png"
                  alt=""
                  onClick={() => onClick(ads.id)}
                >
                  {' '}
                </CustomButtonIcon> */}
                <div></div>

                {/* <CustomButtonIcon
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
                      reportTarget: 'AD',
                      reportAdditionData: {
                        adsBoardID: ads.id,
                        adsPointID: detailAdsPoint.id,
                      },
                    });
                  }}
                >
                  <span className="text-rose-600 text-[0.6rem] text-bold ml-1">
                    BÁO CÁO VI PHẠM
                  </span>
                </CustomButtonIcon> */}
              </div>
            </div>
          </div>
        ))}

        <hr className="mx-2 mb-4 mt-1"></hr>
      </div>
    </div>
  );
}

export default DetailAdsPoint;
