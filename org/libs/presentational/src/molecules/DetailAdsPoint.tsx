'use-client'
import CustomImage from '@presentational/atoms/CustomImage';
import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';

const dataTest = [
    {
        id: 1,
        adsType: "Trụ, cụm pano",
        width: 15,
        height: 10,
        image: "/assets/billboardExample.png",
        adsForm: "Cổ động chính trị",
        locationType: "Đất công/Công viên/Hành lang an toàn giao thông",
        address: "Đồng Khởi - Nguyễn Du (Sở Văn hóa và Thể thao), Phường Bến Nghé, Quận 1"
    },
    {
        id: 2,
        adsType: "Trụ, cụm pano",
        width: 15,
        height: 10,
        image: "/assets/billboardSub.png",
        adsForm: "Cổ động chính trị",
        locationType: "Đất công/Công viên/Hành lang an toàn giao thông",
        address: "Đồng Khởi - Nguyễn Du (Sở Văn hóa và Thể thao), Phường Bến Nghé, Quận 1"
    },
    {
        id: 3,
        adsType: "Trụ, cụm pano",
        width: 15,
        height: 10,
        image: "/assets/billboardSub.png",
        adsForm: "Cổ động chính trị",
        locationType: "Đất công/Công viên/Hành lang an toàn giao thông",
        address: "Đồng Khởi - Nguyễn Du (Sở Văn hóa và Thể thao), Phường Bến Nghé, Quận 1"
    }
]

function DetailAdsPoint() {
    return (
        <div className='h-[100%] w-[25%] shadow-md min-w-[45vh] fixed'
            style={{ left: 0, top: 0 }}>
            <div className='h-[100%] w-[100%] overflow-x-hidden scrollbar-thin bg-white relative overflow-y-scroll scrollbar'>
                {/* Image for ads point */}
                <Carousel showStatus={false} showArrows={false}>
                    {dataTest.map(({ id, image }) => (
                        <div key={id} className='w-[100%] h-[30vh]'>
                            {/* <CustomImage
                                src={image}
                                alt="location"
                                width="100%"
                                height="30vh"
                            /> */}
                            <img src={image} object-cover className="transition-all h-[100%] w-[100%]"></img>
                        </div>
                    ))}
                </Carousel>

                <hr className='mb-4 mx-2'></hr>
                {/* two button for adspoint */}
                <div className="flex my-4 mx-5">
                    <CustomButtonIcon
                        widthIcon='0.9rem'
                        heightIcon='0.9rem'
                        type='button'
                        pathImage='/images/icons/save.png'
                        border={1}
                        round={2}
                        colorBorder='green'
                        alt=''
                    >
                        <span className="text-green-600 text-[0.6rem] text-bold ml-1">LƯU</span>

                    </CustomButtonIcon>
                    <span className="ml-2"></span>
                    <CustomButtonIcon
                        widthIcon='0.8rem'
                        heightIcon='0.8rem'
                        round={2}
                        type='button'
                        border={1}
                        colorBorder='rose'
                        pathImage='/images/icons/report.png'
                        alt=''
                    >
                        <span className="text-rose-600 text-[0.6rem] text-bold ml-1">BÁO CÁO VI PHẠM</span>
                    </CustomButtonIcon>
                </div>

                <hr className='my-4 mx-2'></hr>
                {/* Information advertisement point */}
                <div className="mx-5">
                    <span className="text-[0.8rem] font-semibold text-sky-500">Tổng quan</span>
                    {/* Ads Form */}
                    <div className='flex mt-2 items-center'>
                        <CustomImage
                            src="/assets/adsForm.png"
                            alt="Ads Form"
                            width="0.8rem"
                            height="0.8rem"
                        />

                        <p className='text-[0.7rem] text-neutral-500 ml-1'>
                            Cổ động chính trị
                        </p>
                    </div>

                    {/* Address */}
                    <div className='flex mt-2 items-center'>
                        <div className='h-[100%]'>
                            <CustomImage
                                src="/assets/addressAdsPoint.png"
                                alt="address"
                                width="0.8rem"
                                height="0.8rem"
                            />
                        </div>

                        <p className='text-[0.7rem] text-neutral-500 ml-1'>
                            Đồng Khởi - Nguyễn Du (Sở Văn hóa và Thể thao), Phường Bến Nghé, Quận 1
                        </p>
                    </div>

                    {/* Location Type */}
                    <div className='flex mt-2 items-center'>
                        <CustomImage
                            src="/assets/locationType.png"
                            alt="location"
                            width="0.8rem"
                            height="0.8rem"
                        />

                        <p className='text-[0.7rem] text-neutral-500 ml-2'>
                            Đất công/Công viên/Hành lang an toàn giao thông
                        </p>
                    </div>

                    {/* isPlanned */}
                    <p className='text-[0.75rem] italic font-bold text-rose-600 mt-2'> ĐÃ QUY HOẠCH
                    </p>
                </div>



                <hr className='mx-2 my-4'></hr>
                {/* Title and filter for ads list */}
                <div className="flex justify-between mx-5 mb-2">
                    <div className='flex justify-center items-center'>
                        <span className="ml-1 text-[0.8rem] font-semibold text-sky-500">Danh sách bảng quảng cáo</span>
                    </div>


                    <CustomButtonIcon
                        widthIcon='1rem'
                        heightIcon='1rem'
                        type='button'
                        pathImage='/assets/filterAds.png'
                        alt=''
                    > </CustomButtonIcon>
                </div>

                {/* Design box for each ads */}
                {dataTest.map(({ id, adsType, width, height, adsForm, locationType, address }) => (
                    <div className=" mx-5 mb-3" key={id}>
                        <div className='w-[100%]  p-2 mb-4 border border-1 border-gray-300 rounded-lg hover:shadow-lg focus:shadow-lg'>
                            <div className="flex justify-between">
                                <p className='text-sm font-bold text-neutral-800'>{adsType}</p>
                                <CustomButtonIcon
                                    widthIcon='1rem'
                                    heightIcon='1rem'
                                    type='button'
                                    pathImage='/images/icons/save.png'
                                    alt=''
                                > </CustomButtonIcon>
                            </div>
                            <p className='text-[0.6rem] font-medium text-gray-500'>{address}</p>
                            <div className='flex'>
                                <div>
                                    <CustomImage
                                        src="/assets/billboardExample.png"
                                        alt="ads"
                                        width="12vh"
                                        height="100%"
                                    />
                                </div>

                                <span className='ml-2 font-medium'>
                                    <p className='text-[0.6rem] text-neutral-700'>Kích thước:
                                        <span className='font-bold'> {width}m x {height}m</span>
                                    </p>

                                    <p className=' text-[0.6rem] text-neutral-700'>Hình thức:
                                        <span className='font-bold'> {adsForm}</span>
                                    </p>
                                    <p className='text-[0.6rem] text-neutral-700'>Phân loại:
                                        <span className='font-bold '> {locationType}</span>
                                    </p>
                                </span>
                            </div>


                            {/* Two button */}
                            <div className="flex justify-between mt-2">
                                <CustomButtonIcon
                                    widthIcon='0.9rem'
                                    heightIcon='0.9rem'
                                    type='button'
                                    pathImage='/images/icons/detail.png'
                                    alt=''
                                > </CustomButtonIcon>
                                <CustomButtonIcon
                                    widthIcon='0.8rem'
                                    heightIcon='0.8rem'
                                    round={2}
                                    type='button'
                                    border={1}
                                    colorBorder='rose'
                                    pathImage='/images/icons/report.png'
                                    alt=''
                                >
                                    <span className="text-rose-600 text-[0.6rem] text-bold ml-1">BÁO CÁO VI PHẠM</span>
                                </CustomButtonIcon>
                            </div>
                        </div>
                    </div >
                ))}

                <hr className='mx-2 mb-4 mt-1'></hr>
            </div >
        </div >
    )
}

export default DetailAdsPoint