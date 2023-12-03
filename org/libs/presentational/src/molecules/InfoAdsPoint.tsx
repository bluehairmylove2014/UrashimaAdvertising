import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';
import { IAds } from '@business-layer/services/entities/ads'
import { useCallback } from 'react';

function InfoAds({ info, onClick }: { info: IAds, onClick: (id: number) => void }) {
    return (
        <>
            <div className="flex justify-between">
                <p className='text-sm font-bold'>{info.adsForm}</p>
                <CustomButtonIcon
                    widthIcon='1.1rem'
                    heightIcon='1.1rem'
                    type='button'
                    pathImage='/assets/save.png'
                    alt=''
                >
                    <></>
                </CustomButtonIcon>
            </div>
            <p className='text-[0.7rem] font-medium mb-1 text-neutral-600'>{info.locationType}</p>
            <p className='text-[0.7rem] font-medium mb-1 text-neutral-600'>{info.address}</p>
            <p className='text-[0.75rem] font-extrabold italic mb-2 text-neutral-600'> {info.planned ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH"}</p>
            <div className="flex justify-between">
                <CustomButtonIcon
                    widthIcon='0.9rem'
                    heightIcon='0.9rem'
                    type='button'
                    pathImage='/assets/detail.png'
                    alt=''
                    onClick={() => onClick(info.id)}><></>
                </CustomButtonIcon>
                <CustomButtonIcon
                    widthIcon='0.9rem'
                    heightIcon='0.9rem'
                    round={2}
                    type='button'
                    border={1}
                    colorBorder='rose'
                    pathImage='/assets/report.png'
                    alt=''
                >
                    <span className="text-rose-600 text-[0.65rem] text-medium ml-1">BÁO CÁO VI PHẠM</span>
                </CustomButtonIcon>
            </div>
        </>
    )
}

export default InfoAds