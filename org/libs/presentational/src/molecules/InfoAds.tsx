import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';

function InfoAds() {
    return (
        <>
            <div className="flex justify-between mb-1">
                <p className='text-[0.9rem] font-extrabold font-sans'>Cổ động chính trị</p>
                <CustomButtonIcon
                    widthIcon='1.3rem'
                    heightIcon='1.3rem'
                    type='button'
                    content=''
                    pathImage='/images/icons/save.png'
                    alt=''
                />
            </div>
            <p className='text-[0.7rem] font-medium'>Đất công/Công viên/Hành lang an toàn giao thông</p>
            <p className='text-[0.7rem] font-medium mb-[0.5rem]'>Đồng Khởi - Nguyễn Huệ$(Sở Văn hóa và Thể thao), Phường Bến Nghé, Quận 1</p>
            <p className='text-[0.9rem] font-extrabold italic mb-4'> ĐÃ QUY HOẠCH</p>
            <div className="flex justify-between mb-1">
                <CustomButtonIcon
                    widthIcon='1rem'
                    heightIcon='1rem'
                    type='button'
                    content=''
                    pathImage='/images/icons/detail.png'
                    alt=''
                />
                <CustomButtonIcon
                    widthIcon='1rem'
                    heightIcon='1rem'
                    round='5px'
                    type='button'
                    border='1'
                    colorBorder='rose'
                    content='BÁO CÁO VI PHẠM'
                    pathImage='/images/icons/report.png'
                    alt=''
                ></CustomButtonIcon>
            </div>
        </>
    )
}

export default InfoAds