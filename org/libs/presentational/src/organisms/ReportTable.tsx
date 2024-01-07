'use client'
import { COOKIE_KEYS } from "@business-layer/business-logic/configs/constants";
import { useGetPagination, useSetPaginationData } from "@business-layer/business-logic/non-service-lib/pagination";
import { ReportService, getAllOfficerReportsResponseType, regionResponseType } from "@business-layer/services";
import { IOfficerReport } from "@business-layer/services/entities";
import EmptyIcon from "@presentational/atoms/EmptyIcon";
import IconButton from "@presentational/atoms/IconButton";
import RowLoader from "@presentational/atoms/RowLoader";
import Pagination from "@presentational/molecules/Pagination";
import TableRow from "@presentational/molecules/TableRow";
import { cookies } from "next/dist/client/components/headers";
import { formatDate, slicePaginationData, calculateMaxPage } from '@utils/helpers';
import { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import CustomImage from "@presentational/atoms/CustomImage";
import { useRouter } from "next/navigation";
import { OFFICER_PAGES } from "@constants/officerPages";
import DistrictWardPopUp from "@presentational/molecules/DistrictWardPopUp";


const formReport = [
    'Tất cả hình thức',
    'Tố giác sai phạm',
    'Đóng góp ý kiến',
    'Đăng ký nội dung',
    'Giải đáp thắc mắc',
];

const START_PAGE = 1;
const MAX_ELEMENT_PER_PAGE = 6;

function ReportTable({ reportData, isHeadQuarter, regionsData }: { reportData: getAllOfficerReportsResponseType, isHeadQuarter: boolean, regionsData: regionResponseType | null }) {
    const [isActiveDistrictWardPopUp, setIsActiveDistrictWardPopUp] = useState(false);
    const [selectedFormReport, setSelectedFormReport] = useState(formReport[0]);
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();

    const paginationData = useGetPagination();
    const { setPaginationData } = useSetPaginationData();

    const allReportData = useMemo(() => {
        let filteredData = reportData || [];

        // Filter by report type
        if (selectedFormReport !== 'Tất cả hình thức') {
            filteredData = filteredData.filter((report) => report.reportType === selectedFormReport);
        }

        // Filter by search input
        if (searchValue.trim() !== "") {
            const searchLowerCase = searchValue.toLowerCase();
            filteredData = filteredData.filter((report) =>
                report.address.toLowerCase().includes(searchLowerCase)
            );
        }

        return filteredData;
    }, [selectedFormReport, searchValue, reportData]);

    useEffect(() => {
        if (Array.isArray(allReportData)) {
            setPaginationData({
                currentPage: START_PAGE,
                maxPage: calculateMaxPage(allReportData, MAX_ELEMENT_PER_PAGE),
                maxElementPerPage: MAX_ELEMENT_PER_PAGE,
                dataLength: allReportData.length,
            });
        }
    }, [allReportData]);

    return (
        <>
            {isActiveDistrictWardPopUp ?
                <DistrictWardPopUp regionsData={regionsData} handleClosePopUp={() => {
                    setIsActiveDistrictWardPopUp(false);
                }} />

                : <></>
            }
            <div className="flex flex-row gap-4 justify-between mb-8 w-full">
                <form className="flex-shrink w-96 relative border-solid border-[1px] border-zinc-400 rounded overflow-hidden">
                    <i className="fi fi-rr-search absolute top-1/2 left-4 transform -translate-y-1/2 bottom-[4px] text-[0.65rem]"></i>
                    <input
                        name="searchBox"
                        type="text"
                        className="px-8 py-2 w-full text-[0.65rem] outline-none"
                        placeholder="Search..."
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>
                <div className='flex'>
                    {isHeadQuarter ?
                        <button
                            className='relative bg-indigo-900 hover:bg-indigo-950 text-white font-bold py-2 px-4 rounded text-[0.7rem] w-[100%] mr-3 overflow-auto shadow-lg ring-1 ring-black/5 focus:outline-none'
                            onClick={() => {
                                setIsActiveDistrictWardPopUp(true);
                            }}
                        >
                            Chọn khu vực báo cáo
                        </button>
                        :
                        <></>
                    }

                    <Listbox value={selectedFormReport} onChange={setSelectedFormReport}>
                        <div className="relative w-[35vh]">
                            <Listbox.Button className="relative  text-[0.7rem] w-[100%] cursor-default rounded-sm bg-white border-solid border-[0.6px] border-gray-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300">
                                <span className="block truncate font-semibold ">{selectedFormReport}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <CustomImage
                                        src="/assets/down.png"
                                        alt="Ads Form"
                                        width="0.5rem"
                                        height="0.5rem"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-40 text-[0.7rem] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-199">
                                    {formReport.map((form, formIdx) => (
                                        <Listbox.Option
                                            key={formIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-3 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={form}
                                        >
                                            <span
                                                className={`block truncate ${selectedFormReport ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {form}
                                            </span>
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>

                </div>
            </div>

            <div className="shadow-sm overflow-x-auto overflow-y-hidden rounded-md">
                <table className="w-full table-fixed text-xs text-center">
                    <thead className="bg-indigo-950 text-white font-semibold">
                        <tr>
                            <th scope="col" className="px-2 py-3 w-[5%]">
                                STT
                            </th>
                            <th scope="col" className="px-2 py-3 w-[20%]">
                                Thông Tin Người Gửi
                            </th>
                            <th scope="col" className="px-2 py-3 w-[20%]">
                                Địa Điểm
                            </th>
                            <th scope="col" className="px-2 py-3 w-[10%]">
                                Loại Báo Cáo
                            </th>
                            <th scope="col" className="px-2 py-3 w-[10%]">
                                Tình Trạng Xử Lý
                            </th>
                            <th scope="col" className="px-2 py-3 w-[5%]">
                                Hành Động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(allReportData) ? (
                            allReportData.length > 0 ? (
                                slicePaginationData<IOfficerReport>(
                                    allReportData,
                                    paginationData.currentPage,
                                    paginationData.maxPage,
                                    paginationData.maxElementPerPage
                                ).map((report, reportIndex) => (
                                    <tr
                                        className="py-4 even:bg-gray-100"
                                        key={`adLocation@${report.id}`}
                                    >
                                        <TableRow
                                            listData={[
                                                (reportIndex + 1).toString(),
                                                <span className='font-semibold'>
                                                    <span className="line-clamp-1 font-medium text-xs ">
                                                        <b>Tên:</b>{' '}
                                                        <span className="font-normal">
                                                            {report.name}
                                                        </span>
                                                    </span>
                                                    <span className="line-clamp-1 font-medium text-xs ">
                                                        <b>Email:</b>{' '}
                                                        <span className="font-normal">
                                                            {report.email}
                                                        </span>
                                                    </span>
                                                    <span className="line-clamp-1 font-medium text-xs ">
                                                        <b>Số điện thoại:</b>{' '}
                                                        <span className="font-normal">
                                                            {report.phone}
                                                        </span>
                                                    </span>
                                                </span>,
                                                report.address,
                                                report.reportType,
                                                report.reportStatus ? (
                                                    <span className="text-green-600 font-bold">ĐÃ XÉT DUYỆT</span>
                                                ) : (
                                                    <span className="text-rose-600 font-bold">CHƯA XÉT DUYỆT</span>
                                                ),
                                                <IconButton
                                                    type="button"
                                                    shape="square"
                                                    callback={() => {
                                                        router.push(OFFICER_PAGES.REPORT + `/${report.id}`);
                                                    }}
                                                >
                                                    <i className="fi fi-sr-file-circle-info text-blue-600 text-sm hover:text-blue-400 transition-colors"></i>
                                                </IconButton>
                                            ]}
                                        />
                                    </tr>
                                ))
                            ) : (
                                <tr className="py-4">
                                    <td colSpan={6} className="py-12">
                                        <EmptyIcon label="Không tìm thấy địa điểm nào" />
                                    </td>
                                </tr>
                            )
                        ) : (
                            <RowLoader colNumber={9} />
                        )}
                    </tbody>
                </table>
                {paginationData.maxPage > 0 ? <Pagination /> : <></>}
            </div >


        </>

    )
}

export default ReportTable