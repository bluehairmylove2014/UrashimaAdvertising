'use client'

import { regionResponseType } from "@business-layer/services"
import CommonLoader from "@presentational/atoms/CommonLoader";
import CustomButton from "@presentational/atoms/CustomButton";
import { mulSelectOptionType } from "@presentational/atoms/MultipleLayerSelect";
import YesNoPopup from "@presentational/molecules/YesNoPopup";
import { toggleClass } from "@utils/helpers";
import React, { useEffect, useRef, useState } from "react";

function DistrictManagement({
    regionsData }
    :
    { regionsData: regionResponseType | null }
) {
    const formBoxRefs = useRef<Array<React.RefObject<HTMLDivElement> | null>>([]);
    const [districts, setDistricts] = useState<mulSelectOptionType | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

    const handleToggleFormBox = (index: number) => {
        const formBoxRef = formBoxRefs.current[index];

        if (formBoxRef && formBoxRef.current) {
            toggleClass(formBoxRef.current, 'activeHQFormBox');
        }
    };

    const onSelectDistrict = (type: string, index: number) => {
        setSelectedDistrict(type);
        handleToggleFormBox(index);
    };

    // Delete District 
    const handleDeleteDistrict = () => {

    }

    // Add District
    const handleAddDistrict = () => {

    }

    // Delete Ward 
    const handleDeleteWard = () => {

    }

    // Add Ward
    const handleAddWard = () => {

    }

    useEffect(() => {
        if (districts) {
            formBoxRefs.current = []; // Clear existing refs
            Object.keys(districts).forEach(() => {
                formBoxRefs.current.push(React.createRef<HTMLDivElement>());
            });
        }
    }, [districts]);

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
                    {/* Handle District Management */}
                    <div className='grid grid-cols-4 gap-4 w-full'>
                        {Object.keys(districts).map((r, index) => (
                            <div className='flex' key={index}>
                                <div className='flex items-center justify-center'>
                                    {/* Button delete district */}
                                    <button
                                        onClick={handleDeleteDistrict}
                                        className=" text-white text-[0.5rem] mr-1 rounded bg-rose-600 relative hover:bg-red-400 transition-colors w-5 h-5 max-w-[1.25rem] flex-grow "
                                    >
                                        <i className="fi fi-ss-trash"></i>
                                    </button>
                                </div>

                                <button
                                    className={`text-[0.65rem] ${selectedDistrict === r
                                        ? 'bg-rose-500  text-white'
                                        : 'bg-rose-100 text-black hover:bg-rose-500 hover:text-white'
                                        } transition-colors rounded-lg  font-semibold text-start  whitespace-nowrap px-2 py-2 w-full disabled:cursor-not-allowed`}
                                    type="button"
                                    onClick={() => {
                                        onSelectDistrict(r, index);
                                    }}
                                >
                                    {r}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Button add district */}
                    <form className={`border border-solid border-zinc-300 rounded w-full mt-4 bg-white h-10 relative`}>
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
                                onClick={handleAddDistrict}
                            >
                                <i className="fi fi-bs-check"></i>
                            </CustomButton>
                        </div>
                    </form>

                    {/* Handle Ward Management */}
                    {Object.keys(districts).map((district, indexDis) => (
                        <div
                            className={`bg-rose-100 overflow-auto rounded shadow-[-10px_0px_25px_-15px_rgba(0,0,0,0.1)] p-6 fixed top-0 right-0 w-0 opacity-0 pointer-events-none invisible transition-all z-30 h-screen`}
                            ref={formBoxRefs.current[indexDis]}
                            key={indexDis}
                        >
                            <h4 className="text-black mb-4 text-center">Danh sách phường</h4>
                            <div className="mb-3">
                                {selectedDistrict ? (
                                    districts[selectedDistrict].map((d, index) => (
                                        <div
                                            key={`${index}`}
                                            className="mb-2 w-full rounded flex flex-row justify-between items-center gap-4 bg-white pr-3 pl-4 py-2 shadow"
                                        >
                                            <p className="text-xs font-medium line-clamp-1 flex-shrink max-w-[80%]">
                                                {d}
                                            </p>

                                            {/* Button delete ward */}
                                            <button
                                                onClick={handleDeleteWard}
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

                            {/* Button add ward */}
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
                                        onClick={handleAddWard}
                                    >
                                        <i className="fi fi-bs-check"></i>
                                    </CustomButton>
                                </div>
                            </form>
                        </div>
                    ))}

                </ >
                : <></>
            }

            {/* <YesNoPopup
                isActive={isPopupActive}
                onResult={handleDelete}
                message={'Bạn chắc chắn muốn xoá chứ?'}
            /> */}
        </div >
    )
}

export default DistrictManagement;

