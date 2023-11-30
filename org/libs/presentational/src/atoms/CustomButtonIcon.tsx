'use client';
import Image from 'next/image';

type buttonType = 'button' | 'submit';
const colorType = {
    rose: "border-rose-600",
    black: "border-black-500",
    gray: "border-gray-500"
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
    3: "rounded-md"

}

type customButtonIconType = {
    widthIcon: string;
    heightIcon: string;
    round?: 0 | 1 | 2 | 3;
    border?: 0 | 1 | 2 | 3;
    colorBorder?: 'rose' | 'black' | 'gray';
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
            className={`${borderSize[border || 0]} border-solid ${colorType[colorBorder || "black"]} p-1 ${roundedSize[round || 0]} inline-flex items-center`}
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
