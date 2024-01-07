import { regionResponseType } from "@business-layer/services";
import CustomButtonIcon from "@presentational/atoms/CustomButtonIcon";
import { mulSelectOptionType } from "@presentational/atoms/MultipleLayerSelect";
import { useEffect, useState } from "react";

function DistrictWardPopUp({
    regionsData,
    handleClosePopUp
}: {
    regionsData: regionResponseType | null,
    handleClosePopUp: () => void
}) {
    const [isChooseDistrict, setIsChooseDistrict] = useState(false);
    const [districts, setDistricts] = useState<mulSelectOptionType | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

    const [selectedWard, setSelectedWard] = useState<string | null>(
        null
    );

    const onSelectDistrict = (type: string) => {
        setSelectedDistrict(type);
    };

    const onSelectWard = (type: string) => {
        setSelectedWard(type);
    };

    useEffect(() => {
        if (regionsData) {
            const districts: mulSelectOptionType = { ['Tất cả các quận']: [] };
            regionsData.forEach((r) => {
                const sameKey = Object.keys(districts).find((dk) => dk === r.district);
                if (sameKey) {
                    districts[sameKey].push(r.ward);
                } else {
                    districts[r.district] = ['Tất cả các phường', r.ward];
                }
            });
            setDistricts(districts);
        }
    }, [regionsData]);


    return (
        <div className='fixed w-screen h-screen top-0 left-0 bg-black/60 p-6 rounded-md z-30 flex items-start justify-center'>
            <div className='w-1/2 h-fit bg-white p-6 rounded-md'
            >
                <div className="flex flex-row justify-between text-center mb-3">
                    <div></div>
                    <h3 className='text-center'>Chọn khu vực báo cáo</h3>
                    <CustomButtonIcon
                        widthIcon="0.6rem"
                        heightIcon="0.6rem"
                        type="button"
                        bgColor="bg-black/70"
                        round={5}
                        padding={8}
                        pathImage="/assets/close.png"
                        alt=""
                        onClick={handleClosePopUp}
                    >
                        {' '}
                    </CustomButtonIcon>
                </div>
                <div className=" w-full flex flex-row justify-start items-center gap-2 flex-wrap my-5 mt-7">
                    {districts ?
                        <>
                            {Object.keys(districts).map((r, index) => (
                                <button
                                    key={index}
                                    className={`text-[0.8rem] font-medium ${selectedDistrict === r
                                        ? 'text-indigo-700'
                                        : 'text-indigo-950 hover:text-indigo-600'
                                        } transition-colors rounded-lg mx-4 whitespace-nowrap disabled:cursor-not-allowed`}
                                    type="button"
                                    onClick={() => {
                                        onSelectDistrict(r);
                                        setIsChooseDistrict(true);
                                    }}
                                >
                                    {r}
                                </button>
                            ))}
                        </>
                        : <></>
                    }
                </div>

                {isChooseDistrict ?
                    <>
                        {districts && selectedDistrict && districts[selectedDistrict].length != 0 ?
                            <>
                                <hr className=""></hr>
                                <div className=" w-full flex flex-row justify-start items-center gap-2 flex-wrap my-5 mt-7">
                                    {districts[selectedDistrict].map((ward, index) => (
                                        <button
                                            key={index}
                                            className={`text-[0.7rem] font-medium ${selectedWard === ward
                                                ? 'bg-indigo-950'
                                                : 'bg-indigo-700 hover:bg-indigo-950'
                                                }   px-4 py-2 text-white rounded-lg whitespace-nowrap disabled:cursor-not-allowed`}
                                            type="button"
                                            onClick={() => {
                                                onSelectWard(ward);
                                            }}
                                        >
                                            {ward}
                                        </button>
                                    ))}
                                </div>
                            </>
                            : <></>}
                    </>
                    : <></>}
                <button
                    className='text-[0.75rem] font-bold text-white bg-indigo-950 hover:bg-indigo-1000 w-[100%] px-4 py-2 rounded-lg whitespace-nowrap disabled:cursor-not-allowed'
                    onClick={() => { }}>
                    XÁC NHẬN
                </button>

            </div>
        </div>
    )
}

export default DistrictWardPopUp;