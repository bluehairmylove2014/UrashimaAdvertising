'use client'
import { IOfficerReportDetail } from '@business-layer/services/entities';
import Thumbnail from '@presentational/atoms/Thumbnail';
import { formatDate } from '@utils/helpers';
import ReportResponse from '@presentational/molecules/ReportResponse';
import { useState } from 'react';

const DEFAULT_THUMBNAIL_WIDTH = 120;
const DEFAULT_THUMBNAIL_HEIGHT = 120;

function DisplayReportDetail({ reportDetail, isHeadQuarter }: { reportDetail: IOfficerReportDetail, isHeadQuarter: boolean }) {
    const [handleReportActive, setHandleReportActive] = useState<boolean>(false);

    return (
        <>
            {handleReportActive ?
                <ReportResponse
                    reportData={reportDetail}
                    handleClose={() => {
                        setHandleReportActive(false);
                    }} />
                :
                <></>
            }

            {/* {isHeadQuarter ?
                <></>
                : */}
            <div className='flex justify-end items-end mt-[-4rem] mb-9'>
                {reportDetail?.reportStatus ?
                    <></>
                    :
                    <button
                        className="px-4 py-2 rounded text-[0.65rem] font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors"
                        onClick={() => {
                            setHandleReportActive(true)
                        }}
                    >
                        <i className="fi fi-ss-file-edit mr-2"></i>
                        Xử lý báo cáo
                    </button>
                }
            </div >
            {/* } */}

            <div className="grid grid-cols-2 border-solid border-b-[1px] border-b-zinc-300 pb-5 mb-5">
                <div className="col-span-1 col-start-1 row-start-1 w-full overflow-hidden">
                    {reportDetail.reportStatus ?
                        <p className="w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem] mb-2 text-green-600 font-bold text-sm">
                            ĐÃ XÉT DUYỆT
                        </p>
                        :
                        <p className="w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem] mb-2 text-rose-600 font-bold text-sm">
                            CHƯA XÉT DUYỆT
                        </p>
                    }


                    <div className="flex flex-row justify-start items-center mb-2 w-full">
                        <h5 className="font-semibold text-sm whitespace-nowrap">
                            <i className="fi fi-sr-megaphone mr-2"></i>
                            Loại báo cáo:
                        </h5>
                        <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                            {reportDetail.reportType}
                        </p>
                    </div>

                    <div className="flex flex-row justify-start items-center mb-2">
                        <h5 className="font-semibold text-sm whitespace-nowrap">
                            <i className="fi fi-sr-id-card-clip-alt mr-2"></i>
                            Họ và tên:
                        </h5>

                        <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                            {reportDetail.name}
                        </p>
                    </div>

                    <div className="flex flex-row justify-start items-center mb-2">
                        <h5 className="font-semibold text-sm whitespace-nowrap">
                            <i className="fi fi-sr-phone-call mr-2"></i>
                            Số điện thoại:
                        </h5>

                        <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                            {reportDetail.phone}
                        </p>
                    </div>

                    <div className="flex flex-row justify-start items-center mb-2">
                        <h5 className="font-semibold text-sm whitespace-nowrap">
                            <i className="fi fi-sr-envelope mr-2"></i>
                            Email:
                        </h5>

                        <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                            {reportDetail.email}
                        </p>
                    </div>

                    <div className="justify-start items-center mb-2">
                        <h5 className="font-semibold text-sm whitespace-nowrap">
                            <i className="fi fi-sr-graphic-style mr-2"></i>
                            Hình ảnh minh chứng:
                        </h5>

                        <p className="mt-2 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                            <Thumbnail
                                width={DEFAULT_THUMBNAIL_WIDTH}
                                height={DEFAULT_THUMBNAIL_HEIGHT}
                                src="/assets/billboardExample.png"
                            // key={`${img.image}@${index}`}
                            />
                        </p>
                    </div>
                </div>
                <div className="col-span-1 col-st row-start-1">
                    <h5 className=" font-semibold text-sm">
                        <i className="fi fi-sr-browser mr-2"></i>
                        Nội dung báo cáo:
                    </h5>
                    <div className="flex flex-row justify-start items-center gap-4 mb-4">
                        <div className="h-[30vh] w-full border border-neutral-500 rounded mt-1 p-1 text-[0.7rem] text-neutral-700">
                            <div
                                dangerouslySetInnerHTML={{ __html: reportDetail.content }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {
                reportDetail.reportStatus ?
                    <div className="border-solid border-b-[1px] border-b-zinc-300 pb-5 mb-5">
                        <h5 className="font-bold">CÁCH XỬ LÝ</h5>
                        <div className="h-[30vh] w-full border border-neutral-500 rounded mt-1 p-1 text-[0.7rem] text-neutral-700">
                            <div>{reportDetail.treatmentProcess}</div>
                        </div>
                    </div>
                    : <></>
            }

            {
                reportDetail.adsPoint ?
                    <>
                        <h5 className="font-bold">THÔNG TIN ĐIỂM QUẢNG CÁO BỊ TỐ CÁO</h5>
                        <div className="grid grid-cols-2 mt-3">
                            <div className="col-span-1 col-start-1 row-start-1 w-full overflow-hidden">
                                <div className="flex flex-row justify-start items-start mb-2 w-full">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-sr-map-marker mr-2"></i>
                                        Địa điểm:
                                    </h5>
                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                                        {reportDetail.address}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-start items-center mb-2">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-sr-layers mr-2"></i>
                                        Phân loại:
                                    </h5>

                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                                        {reportDetail.adsPoint.locationType}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-start items-center mb-2">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-sr-ad mr-2"></i>
                                        Hình thức:
                                    </h5>
                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                                        {reportDetail.adsPoint.adsForm}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-sr-megaphone mr-2"></i>
                                        Tình trạng:
                                    </h5>
                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem] font-bold">
                                        {reportDetail.adsPoint.planned ?
                                            <span className='text-green-700'>
                                                Đã quy hoạch
                                            </span>
                                            :
                                            <span className='text-rose-600'>
                                                Chưa quy hoạch
                                            </span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <></>
            }

            {
                reportDetail.adsBoard ?
                    <>
                        <h5 className="font-bold">THÔNG TIN BẢNG QUẢNG CÁO BỊ TỐ CÁO</h5>
                        <div className="grid grid-cols-2 mt-3">
                            <div className="col-span-1 col-start-1 row-start-1 w-full overflow-hidden">
                                <div className="flex flex-row justify-start items-center mb-2 w-full">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-sr-ad mr-2"></i>
                                        Loại bảng quảng cáo:
                                    </h5>
                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                                        {reportDetail.adsBoard.adsType}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-start mb-2 items-start">
                                    <h5 className="font-semibold text-sm whitespace-nowrap ">
                                        <i className="fi fi-sr-map-marker mr-2"></i>
                                        Địa điểm:
                                    </h5>

                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem] ">
                                        {reportDetail.address}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-start items-center mb-2">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-sr-layers mr-2"></i>
                                        Kích thước:
                                    </h5>
                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                                        {reportDetail.adsBoard.width}m x {reportDetail.adsBoard.height}m
                                    </p>
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-sr-megaphone mr-2"></i>
                                        Ngày hết hạn:
                                    </h5>
                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem] text-rose-600 font-bold">
                                        {formatDate(new Date(reportDetail.adsBoard.expiredDate)).dateMonthYear}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-1 col-start-2 row-start-1">
                                <h5 className=" font-semibold text-sm mb-2">
                                    <i className="fi fi-sr-picture mr-2"></i>
                                    Hình ảnh điểm quảng cáo:
                                </h5>
                                <div className="flex flex-row justify-start items-center gap-4 mb-2">
                                    <Thumbnail
                                        width={DEFAULT_THUMBNAIL_WIDTH}
                                        height={DEFAULT_THUMBNAIL_HEIGHT}
                                        src={reportDetail.adsBoard.image}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <></>
            }

            {
                reportDetail.Location ?
                    <>
                        <h5 className="font-bold">THÔNG TIN ĐỊA ĐIỂM BỊ TỐ CÁO</h5>
                        <div className="grid grid-cols-2 mt-3">
                            <div className="col-span-1 col-start-1 row-start-1 w-full overflow-hidden">
                                <div className="flex flex-row justify-start items-start mb-2 w-full">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-sr-map-marker mr-2"></i>
                                        Địa điểm:
                                    </h5>
                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                                        {reportDetail.Location.address}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-start items-center mb-2">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-sr-world mr-2"></i>
                                        Kinh độ:
                                    </h5>

                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                                        {reportDetail.Location.longitude}
                                    </p>
                                </div>

                                <div className="flex flex-row justify-start items-center mb-2">
                                    <h5 className="font-semibold text-sm whitespace-nowrap">
                                        <i className="fi fi-br-world mr-2"></i>
                                        Vĩ độ:
                                    </h5>
                                    <p className="pl-3 w-full whitespace-normal line-clamp-2 relative -bottom-[0.1rem]">
                                        {reportDetail.Location.latitude}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <></>
            }
        </>
    )
}

export default DisplayReportDetail