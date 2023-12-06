import { Carousel } from 'react-responsive-carousel';
import CustomImage from '@presentational/atoms/CustomImage';


function ReportDetail() {
    return (
        <div className="h-[100%] w-[25%] bg-white shadow-md min-w-[45vh] fixed overflow-y-scroll scrollbar" style={{ left: 0, top: 0 }}>
            <Carousel showStatus={false} showThumbs={false}>
                <div className="w-[100%] h-[30vh]">
                    <CustomImage
                        src="/assets/billboardExample.png"
                        alt="location"
                        width="100%"
                        height="30vh"
                    />
                </div>
                <div className="w-[100%] h-[30vh]">
                    <CustomImage
                        src="/assets/billboardExample.png"
                        alt="location"
                        width="100%"
                        height="30vh"
                    />
                </div>
            </Carousel>


            <div className='m-4'>
                {/* Title history report */}
                <div className="flex justify-between">
                    <p className='text-center text-[0.9rem] font-bold text-neutral-700'>Tố giác vi phạm</p>
                    <p className='text-rose-600 font-bold italic'>CHƯA XÉT DUYỆT</p>
                </div>

                <div className='flex mt-3 flex-row items-center'>
                    <CustomImage
                        src="/assets/locationType.png"
                        alt="location"
                        width="0.7rem"
                        height="0.7rem"
                    />
                    <p className='text-[0.7rem] text-neutral-600 ml-2 font-semibold'> Điểm quảng cáo
                    </p>
                </div>

                <div className='flex flex-row items-start mt-3'>
                    <div className='h-[100%]'>
                        <CustomImage
                            src="/assets/addressAdsPoint.png"
                            alt="address"
                            width="0.8rem"
                            height="0.8rem"
                        />
                    </div>

                    <p className='text-[0.7rem] text-neutral-600 ml-2'> Địa điểm:
                        <span className='font-semibold'> 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP. Hồ Chí Minh</span>
                    </p>
                </div>

                <div className='flex mt-3 flex-row items-start'>
                    <CustomImage
                        src="/assets/adsForm.png"
                        alt="Ads Form"
                        width="0.8rem"
                        height="0.8rem"
                    />

                    <p className='text-[0.7rem] text-neutral-600 ml-2'> Hình thức quảng cáo:
                        <span className='font-semibold'> Cổ động chính trị</span>
                    </p>
                </div>

                <div className='flex mt-3 flex-row items-start'>
                    <div>
                        <CustomImage
                            src="/assets/size.png"
                            alt="Ads Form"
                            width="0.8rem"
                            height="0.8rem"
                        />
                    </div>


                    <p className='text-[0.7rem] text-neutral-600 ml-2'> Nội dung:
                        <span className='font-semibold'> Tôi không cho phép đặt biển ở đây, nó làm che mất view ở nhà tôi. Điều này thật vô lý   </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReportDetail