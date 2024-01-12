'use client'
import { IOfficerReport } from "@business-layer/services/entities";
import { OFFICER_PAGES } from "@constants/officerPages";
import CustomButtonIcon from "@presentational/atoms/CustomButtonIcon";
import { useRouter } from 'next/navigation';

function ListReport({
    listReport,
    handleClose,
    handleBack,
}: {
    listReport: IOfficerReport[] | undefined;
    handleClose: () => void;
    handleBack: () => void;
}
) {
    const router = useRouter();

    return (
        <div
            className="h-[100vh] w-[25%] absolute shadow-md min-w-[45vh] z-50 bg-white"
            style={{ left: 0, top: 0 }}
        >
            <div className="absolute z-10 top-0 right-0 mt-2 mx-1">
                <CustomButtonIcon
                    widthIcon="0.6rem"
                    heightIcon="0.6rem"
                    type="button"
                    bgColor="bg-black/70"
                    round={5}
                    padding={8}
                    pathImage="/assets/close.png"
                    alt=""
                    onClick={handleClose}
                >
                    {' '}
                </CustomButtonIcon>
            </div>
            <div className="absolute top-0 left-0 z-10 mt-2 mx-1">
                <CustomButtonIcon
                    widthIcon="0.7rem"
                    heightIcon="0.7rem"
                    type="button"
                    pathImage="/assets/undo.png"
                    alt=""
                    border={1}
                    colorBorder="blue"
                    round={4}
                    onClick={handleBack}
                >
                    {' '}
                </CustomButtonIcon>
            </div>

            {/* Title history report */}
            <div className="flex justify-center mt-3 p-2">
                <p className="text-center text-[1rem] font-bold ml-1 text-neutral-700">
                    DANH SÁCH BÁO CÁO
                </p>
            </div>

            <div className="my-5">
                <>
                    {listReport?.map((report) => (
                        <div
                            className="mx-3 bg-white p-3 border rounded-lg font-bold cursor-pointer hover:shadow-lg focus:shadow-lg mt-3"
                            key={report.id}
                            onClick={() => { router.push(OFFICER_PAGES.REPORT + `/${report.id}`); }}
                        >
                            <div className="flex justify-between">
                                <p className="text-sky-600 text-[0.8rem]">{report.reportType}</p>
                                {report.reportStatus ?
                                    <p className="text-green-600 text-[0.7rem]">
                                        ĐÃ XÉT DUYỆT
                                    </p>
                                    :
                                    <p className="text-rose-600 text-[0.7rem]">
                                        ĐANG XÉT DUYỆT
                                    </p>
                                }
                            </div>
                            <hr className="my-2" />
                            <p className=" text-[0.7rem] whitespace-normal font-semibold">
                                Địa điểm:
                                <span className="font-medium text-gray-600">
                                    {' '}
                                    {report.address}
                                </span>
                            </p>
                            <p className=" text-[0.7rem] whitespace-normal">
                                Vĩ độ:
                                <span className="font-medium text-gray-600">
                                    {' '}
                                    {report.lat}
                                </span>
                            </p>
                            <p className=" text-[0.7rem] whitespace-normal">
                                Kinh độ:
                                <span className="font-medium text-gray-600">
                                    {' '}
                                    {report.lon}
                                </span>
                            </p>
                            <p className=" text-[0.7rem] whitespace-normal flex line-clamp-1">
                                Nội dung báo cáo:
                                <span className="font-medium text-gray-600">
                                    {' '}
                                    <div dangerouslySetInnerHTML={{ __html: report.content }}></div>
                                </span>
                            </p>
                        </div>
                    ))}
                </>
            </div>
        </div >
    )
}

export default ListReport;