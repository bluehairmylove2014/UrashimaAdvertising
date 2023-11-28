'use client';
import Image from 'next/image';

type buttonType = 'button' | 'submit';

type customButtonIconType = {
    widthIcon: string;
    heightIcon: string;
    round?: string;
    border?: string;
    colorBorder?: string;
    type?: buttonType;
    onClick?: (arg0: any) => void;
    pathIcon?: string;
    content: string;
    pathImage: string;
    alt: string
};

const defaultType = 'button';

function CustomButtonIcon({
    widthIcon,
    heightIcon,
    round,
    border,
    colorBorder,
    type,
    onClick,
    pathIcon,
    content,
    pathImage,
    alt
}: customButtonIconType): JSX.Element {

    return (
        <button
            className={`border-${colorBorder ?? "black"}-500 border-solid border-${border ?? "0"} p-1 rounded-[${round ?? "0px"}] inline-flex items-center`}
            onClick={onClick}
            type={type ?? defaultType}
        >
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={`fill - [#0E8D14] w - [${ widthIcon }] h - [${ heightIcon }]`}>
                <path d={`${ pathIcon } `}>
                </path>
            </svg> */}

            <div className="relative w-full h-full overflow-hidden" style={{ width: widthIcon, height: heightIcon }}>
                <Image
                    className='object-cover'
                    src={pathImage}
                    alt={alt}
                    fill
                    quality='100'
                    loading='lazy'
                >
                </Image>
            </div>
            <span className={`text-[0.7rem] ml-1 text-rose-700`}>{content}</span>
        </button >
    );
}

export default CustomButtonIcon;
