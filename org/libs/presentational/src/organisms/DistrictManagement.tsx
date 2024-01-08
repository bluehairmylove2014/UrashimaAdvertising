'use client'

import { regionResponseType } from "@business-layer/services"
import CommonLoader from "@presentational/atoms/CommonLoader";
import CustomButton from "@presentational/atoms/CustomButton";
import { mulSelectOptionType } from "@presentational/atoms/MultipleLayerSelect";
import { toggleClass } from "@utils/helpers";
import { useEffect, useRef, useState } from "react";

function DistrictManageMent({
    regionsData }
    :
    { regionsData: regionResponseType | null }
) {
    const formBoxRef = useRef<HTMLDivElement>(null);
    const handleToggleFormBox = () => {
        toggleClass(formBoxRef.current, 'activeHQFormBox');
    };

    const [districts, setDistricts] = useState<mulSelectOptionType | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const onSelectDistrict = (type: string) => {
        setSelectedDistrict(type);
        handleToggleFormBox();
    };

    useEffect(() => {
        if (regionsData) {
            const districts: mulSelectOptionType = {};
            regionsData.forEach((r) => {
                const sameKey = Object.keys(districts).find((dk) => dk === r.district);
                if (sameKey) {
                    districts[sameKey].push(r.ward);
                } else {
                    districts[r.district] = [r.ward];
                }
            });

            setDistricts(districts);
        }
    }, [regionsData]);

    return (
        <div className="w-[65%]">
            {districts ?
                <>
                    <div className='grid grid-cols-4 gap-4 w-full'>
                        {Object.keys(districts).map((r, index) => (
                            <div className='flex'>
                                <div className='flex items-center justify-center'>
                                    <button
                                        className=" text-white text-[0.5rem] mr-1 rounded bg-rose-600 relative hover:bg-red-400 transition-colors w-5 h-5 max-w-[1.25rem] flex-grow "
                                    >
                                        <i className="fi fi-ss-trash"></i>
                                    </button>
                                </div>

                                <button
                                    key={index}
                                    className={`text-[0.75rem] ${selectedDistrict === r
                                        ? 'bg-rose-500  text-white font-medium'
                                        : 'bg-rose-100 text-black hover:bg-rose-500 hover:text-white font-medium '
                                        } transition-colors rounded-lg text-start  whitespace-nowrap px-2 py-2 w-full disabled:cursor-not-allowed`}
                                    type="button"
                                    onClick={() => {
                                        onSelectDistrict(r);
                                    }}
                                >
                                    {r}
                                </button>

                            </div>
                        ))}
                    </div>

                    <form
                        className={`border border-solid border-zinc-300 rounded w-full mt-4 bg-white h-10 relative`}
                    >
                        <input
                            type="text"
                            placeholder="+  Thêm mới"
                            className="w-full h-full bg-transparent text-xs font-medium px-4 outline-none"
                        />
                        <div className="absolute top-1/2 right-1 -translate-y-1/2 w-10">
                            <CustomButton
                                style="fill-green"
                                type="submit"
                                isShortLoading={true}
                            >
                                <i className="fi fi-bs-check"></i>
                            </CustomButton>
                        </div>
                    </form>
                </ >
                : <></>
            }
            <>
                <div
                    className={`bg-rose-100 overflow-auto rounded shadow-[-10px_0px_25px_-15px_rgba(0,0,0,0.1)] p-6 fixed top-0 right-0 w-0 opacity-0 pointer-events-none invisible transition-all z-30 h-screen`}
                    ref={formBoxRef}
                >
                    <h4 className="text-black mb-4 text-center">Danh sách phường</h4>
                    <div className="mb-3">
                        {districts && selectedDistrict ? (
                            districts[selectedDistrict].map((d, index) => (
                                <div
                                    key={`${index}`}
                                    className="mb-2 w-full rounded flex flex-row justify-between items-center gap-4 bg-white pr-3 pl-4 py-2 shadow"
                                >
                                    <p className="text-xs font-medium line-clamp-1 flex-shrink max-w-[80%]">
                                        {d}
                                    </p>
                                    <button
                                        className="text-white text-[0.5rem] rounded bg-rose-600 hover:bg-red-400 transition-colors w-5 h-5 max-w-[1.25rem] flex-grow"
                                    >
                                        <i className="fi fi-ss-trash"></i>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <CommonLoader />
                        )}
                    </div>
                    <form
                        className={`border border-solid border-zinc-300 rounded bg-white w-full h-10 relative`}
                    >
                        <input
                            type="text"
                            placeholder="+  Thêm mới"
                            className="w-full h-full bg-transparent text-xs font-medium px-4 outline-none"
                        />
                        <div className="absolute top-1/2 right-1 -translate-y-1/2 w-10">
                            <CustomButton
                                style="fill-green"
                                type="submit"
                                isShortLoading={true}
                            >
                                <i className="fi fi-bs-check"></i>
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </>

        </div >
    )
}

export default DistrictManageMent