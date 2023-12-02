import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';
import { IAdsPoint } from '@business-layer/services/entities/IAdsPoint'

//Create IProps to get info advertisement from parent
interface IProps {
    info: IAdsPoint
}

function InfoAds(props: IProps) {
    const { info } = props
    return (
        <div className=''>
            <div className="flex justify-between mb-1">
                <p className='text-sm font-bold'>{info.adsForm}</p>
                <CustomButtonIcon
                    widthIcon='1.3rem'
                    heightIcon='1.3rem'
                    type='button'
                    pathImage='/images/icons/save.png'
                    alt=''
                >
                    <></>
                </CustomButtonIcon>
            </div>
            <p className='text-xs font-medium mb-1'>{info.locationType}</p>
            <p className='text-xs font-medium mb-2'>{info.address}</p>
            <p className='text-sm font-extrabold italic mb-2 text-neutral-800'> {info.planned ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH"}</p>
            <div className="flex justify-between">
                <CustomButtonIcon
                    widthIcon='0.9rem'
                    heightIcon='0.9rem'
                    type='button'
                    pathImage='/images/icons/detail.png'
                    alt=''
                >
                    <>
                    </>
                </CustomButtonIcon>
                <CustomButtonIcon
                    widthIcon='0.9rem'
                    heightIcon='0.9rem'
                    round={2}
                    type='button'
                    border={1}
                    colorBorder='rose'
                    pathImage='/images/icons/report.png'
                    alt=''
                >
                    <span className="text-rose-600 text-xs text-medium ml-1">BÁO CÁO VI PHẠM</span>
                </CustomButtonIcon>
            </div>
        </div>
    )
}

export default InfoAds