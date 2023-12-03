'use client';
import Image from 'next/image';

type buttonType = 'button' | 'submit';
const colorType = {
    rose: "border-rose-600 hover:bg-rose-100 transition-colors",
    black: "border-black-500",
    gray: "border-gray-500 hover:bg-gray-100",
    green: "border-green-600 hover:bg-green-100",
    blue: "border-sky-600 bg-white"
}

const borderSize = {
    0: "border-0",
    1: "border-2",
    2: "border-4",
    3: "border-8"
}

const roundedSize = {
    0: "rounded-none",
    1: "rounded-sm",
    2: "rounded",
    3: "rounded-md",
    4: "rounded-[50%]"
}

type customButtonIconType = {
    widthIcon: string;
    heightIcon: string;
    round?: 0 | 1 | 2 | 3 | 4;
    border?: 0 | 1 | 2 | 3;
    colorBorder?: 'rose' | 'black' | 'gray' | 'green' | 'blue';
    type?: buttonType;
    onClick?: (arg0: any) => void;
    pathImage: string;
    alt: string;
    children: React.ReactNode;
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
    pathImage,
    alt,
    children
}: customButtonIconType): JSX.Element {

    return (
        <button
            className={`${borderSize[border || 0]} w-fit border-solid ${colorType[colorBorder || "black"]} p-1 ${roundedSize[round || 0]} inline-flex items-center`}
            onClick={onClick}
            type={type || defaultType}
        >
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
            {children}
        </button >
    );
}

export default CustomButtonIcon;