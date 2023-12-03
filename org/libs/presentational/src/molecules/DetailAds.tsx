'use-client'
import CustomImage from '@presentational/atoms/CustomImage';
import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';
import { IAdsDetail } from '@business-layer/services/entities/ads'

const convertDate = (date: string) => {
    const dateConvert = date.split("-")
    return dateConvert[2] + "/" + dateConvert[1] + "/" + dateConvert[0]
}
function DetailAdsPoint({ adsBoard }: { adsBoard: IAdsDetail }) {
    const adsBoardDetail = adsBoard.adsBoard[0]
    return (
        <div className='h-[100%] w-[25%] shadow-md min-w-[45vh]'
            style={{ left: 0, top: 0 }}>
            <div className='h-[100%] w-[100%] bg-white relative'>
                {/* <div className='w-[99%] h-[29%] absolute'>
                    <div className="absolute z-10 top-0 right-0 mt-2">
                        <CustomButtonIcon
                            widthIcon='0.7rem'
                            heightIcon='0.7rem'
                            type='button'
                            pathImage='/assets/close.png'
                            alt=''
                        > </CustomButtonIcon>
                    </div>
                    <div className="absolute bottom-0 right-0 z-10 ">
                        <CustomButtonIcon
                            widthIcon='0.9rem'
                            heightIcon='0.9rem'
                            type='button'
                            pathImage='/assets/share.png'
                            alt=''
                            border={1}
                            colorBorder='blue'
                            round={4}
                        > </CustomButtonIcon>
                    </div>
                </div> */}

                {/* <Carousel showStatus={false} showArrows={false} showThumbs={false}>
                    {adsBoard.image.map(value => ( */}
                <div className='w-[100%] h-[30vh]'>
                    <CustomImage
                        src='/assets/billboardExample.png'
                        alt="location"
                        width="100%"
                        height="100%"
                    />
                </div>
                {/* //     ))}
                // </Carousel> */}

                {/* advertisement type */}
                <h3 className='my-3 mx-3'>{adsBoardDetail.adsType}</h3>

                {/* two button for adspoint */}
                <div className="flex my-3 mx-3">
                    <CustomButtonIcon
                        widthIcon='0.9rem'
                        heightIcon='0.9rem'
                        type='button'
                        pathImage='/assets/save.png'
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
                        pathImage='/assets/report.png'
                        alt=''
                    >
                        <span className="text-rose-600 text-[0.6rem] text-bold ml-1">BÁO CÁO VI PHẠM</span>
                    </CustomButtonIcon>
                </div>

                <hr className='mx-2'></hr>
                {/* Information advertisement point */}
                <div className="mx-3 my-4">
                    {/* Address */}
                    <div className='flex flex-row items-start'>
                        <div className='h-[100%]'>
                            <CustomImage
                                src="/assets/addressAdsPoint.png"
                                alt="address"
                                width="0.8rem"
                                height="0.8rem"
                            />
                        </div>

                        <p className='text-[0.7rem] text-neutral-700 ml-2'> Địa điểm:
                            <span className='font-semibold'> {adsBoard.address}</span>
                        </p>
                    </div>

                    {/* Size */}
                    <div className='flex mt-3 flex-row items-start'>
                        <div className='h-[100%]'>
                            <CustomImage
                                src="/assets/size.png"
                                alt="address"
                                width="0.8rem"
                                height="0.8rem"
                            />
                        </div>

                        <p className='text-[0.7rem] text-neutral-700 ml-2'> Kích thước:
                            <span className='font-semibold'> {adsBoardDetail.width}m x {adsBoardDetail.height}m</span>
                        </p>
                    </div>

                    {/* Ads Form */}
                    <div className='flex mt-3 flex-row items-start'>
                        <CustomImage
                            src="/assets/adsForm.png"
                            alt="Ads Form"
                            width="0.8rem"
                            height="0.8rem"
                        />

                        <p className='text-[0.7rem] text-neutral-700 ml-2'> Hình thức:
                            <span className='font-semibold'> {adsBoard.adsForm}</span>
                        </p>
                    </div>



                    {/* Location Type */}
                    <div className='flex mt-3 flex-row items-start'>
                        <CustomImage
                            src="/assets/locationType.png"
                            alt="location"
                            width="0.8rem"
                            height="0.8rem"
                        />
                        <p className='text-[0.7rem] text-neutral-700 ml-2'> Phân loại:
                            <span className='font-semibold'> {adsBoard.locationType}</span>
                        </p>
                    </div>
                </div>

                <hr className='mx-2 '></hr>
                <div className='mx-3 mt-4'>
                    <p className='text-[0.8rem] text-neutral-600'>
                        {adsBoard.planned ?
                            <span className='font-bold text-green-700'>ĐÃ QUY HOẠCH</span>
                            : <span className='font-bold text-rose-600'>CHƯA QUY HOẠCH</span>}
                    </p>
                    <p className='text-[0.8rem] text-neutral-700 mt-2'> Ngày hết hạn hợp đồng:
                        <span className='font-bold text-rose-600'> {convertDate(adsBoardDetail.expiredDate)}</span>
                    </p>
                </div>
            </div >
        </div >
    )
}

export default DetailAdsPoint