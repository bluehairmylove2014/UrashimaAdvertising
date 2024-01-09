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
import MultipleLayerSelect, { mulSelectOptionType } from "@presentational/atoms/MultipleLayerSelect";


const formReport = [
    'Tất cả hình thức',
    'Tố giác sai phạm',
    'Đóng góp ý kiến',
    'Đăng ký nội dung',
    'Giải đáp thắc mắc',
];

const START_PAGE = 1;
const MAX_ELEMENT_PER_PAGE = 4;

function ReportTable({ reportData, isHeadQuarter, regionsData }: { reportData: getAllOfficerReportsResponseType, isHeadQuarter: boolean, regionsData: regionResponseType | null }) {
    const router = useRouter();

    const [districts, setDistricts] = useState<mulSelectOptionType | null>(null);
    const [selectedFormReport, setSelectedFormReport] = useState(formReport[0]);
    const [searchValue, setSearchValue] = useState("");

    const paginationData = useGetPagination();
    const { setPaginationData } = useSetPaginationData();

    const [allReportData, setAllReportData] = useState<getAllOfficerReportsResponseType | null>(null);

    const [district, setDistrict] = useState<string | null>(null);
    const [ward, setWard] = useState<string | null>(null);


    useMemo(() => {
        let filteredData = reportData;

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

        if (district === null) {
            return setAllReportData(filteredData);
        } else if (ward === null && district !== null) {
            filteredData = (filterByArea(filteredData, district));
        } else {
            if (allReportData !== null && ward !== null)
                filteredData = (filterByArea(filterByArea(filteredData, district), ward));
        }

        setAllReportData(filteredData);
    }, [selectedFormReport, searchValue, reportData, district, ward]);

    function escapeRegExp(str: string) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function filterByArea(reportData: getAllOfficerReportsResponseType, specificArea: string) {
        const escapedArea = escapeRegExp(specificArea);
        const regex = new RegExp(
            `(?:[.,\\s]*\\b${escapedArea}\\b[.,\\s]*([\\w\\s]+)(?:[.,\\s]*|$))`,
            'i'
        );

        return reportData.filter((r) => {
            return regex.test(r.address);
        });
    }

    const handleFilterByRegion = ({
        district,
        ward,
    }: {
        district: string | null;
        ward: string | null;
    }) => {
        setDistrict(district);
        setWard(ward);
    };

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

    useEffect(() => {
        if (regionsData) {
            const districts: mulSelectOptionType = { ['Tất cả các quận']: [] };
            regionsData.forEach((r) => {
                const sameKey = Object.keys(districts).find((dk) => dk === r.district);
                if (sameKey) {
                    districts[sameKey].push(r.ward);
                } else {
                    districts[r.district] = ['Tất cả', r.ward];
                }
            });
            setDistricts(districts);
        }
    }, [regionsData]);

    return (
        <>
            <div className="flex flex-row gap-4 justify-between mt-4 mb-8 w-full h-8">
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
                        <MultipleLayerSelect
                            label="Tất cả các quận"
                            onOptionSelect={handleFilterByRegion}
                            options={districts}
                            style="softCyan"
                            disabled={false}
                        />
                        :
                        <></>
                    }

                    <Listbox value={selectedFormReport} onChange={setSelectedFormReport}>
                        <div className="">
                            <Listbox.Button
                                className="h-full flex flex-row items-center text-[0.65rem] min-w-[10rem] disabled:cursor-not-allowed disabled:bg-zinc-100 bg-cyan-50 border-solid border-[1px] rounded border-zinc-400 ml-3">
                                <span className="flex-grow mr-3 ml-3 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis line-clamp-1">
                                    {selectedFormReport}
                                </span>
                                <div className="flex-shrink border-solid border-l-[1px] border-zinc-400 w-fit h-full bg-inherit grid place-items-center">
                                    <i className="fi fi-bs-angle-small-down px-2"></i>
                                </div>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-40 text-[0.65rem] min-w-[10rem] ml-3 rounded bg-white py-1 shadow-lg  focus:outline-none">
                                    {formReport.map((form, formIdx) => (
                                        <Listbox.Option
                                            key={formIdx}
                                            className={({ active }) =>
                                                `transition-colors w-full text-[0.65rem] py-3 px-2 cursor-default select-none ${active ? 'bg-gray-100' : 'bg-white'
                                                } ${selectedFormReport === form ? 'bg-sky-200' : ' '}`
                                            }
                                            value={form}
                                        >
                                            <span
                                                className={`block truncate text-[0.65rem] font-semibold text-center text-black`}
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
                            <th scope="col" className="px-2 py-3 w-[30%]">
                                Thông Tin Chung
                            </th>
                            <th scope="col" className="px-2 py-3 w-[25%]">
                                Địa Điểm
                            </th>
                            <th scope="col" className="px-2 py-3 w-[30%]">
                                Tình Trạng Xử Lý
                            </th>
                            <th scope="col" className="px-2 py-3 w-[10%]">
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
                                                report.id,
                                                <span className='font-semibold'>
                                                    <span className="line-clamp-1 font-medium text-xs ">
                                                        <b>Tên:</b>
                                                        {' '}
                                                        <span className="font-normal">
                                                            {report.name}
                                                        </span>
                                                    </span>
                                                    <span className="line-clamp-1 font-medium text-xs ">
                                                        <b>Email:</b>
                                                        {' '}
                                                        <span className="font-normal">
                                                            {report.email}
                                                        </span>
                                                    </span>
                                                    <span className="line-clamp-1 font-medium text-xs ">
                                                        <b>Số điện thoại:</b>
                                                        {' '}
                                                        <span className="font-normal">
                                                            {report.phone}
                                                        </span>
                                                    </span>
                                                    <span className="line-clamp-1 font-medium text-xs">
                                                        <b>Loại báo cáo:</b>
                                                        {' '}
                                                        <span className="text-blue-600">
                                                            {report.reportType}
                                                        </span>
                                                    </span>
                                                </span>,
                                                report.address,
                                                report.reportStatus ? (
                                                    <>
                                                        <span className="text-green-600 font-bold">
                                                            ĐÃ XÉT DUYỆT
                                                        </span>
                                                        <span className="line-clamp-3 font-medium text-xs">
                                                            <b>Nội dung:</b>
                                                            {' '}
                                                            <span className="font-normal text-gray-600">
                                                                {report.treatmentProcess}
                                                            </span>
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-rose-600 font-bold">
                                                        CHƯA XÉT DUYỆT
                                                    </span>
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
                                    <td colSpan={5} className="py-12">
                                        <EmptyIcon label="Không tìm thấy địa điểm nào" />
                                    </td>
                                </tr>
                            )
                        ) : (
                            <RowLoader colNumber={6} />
                        )}
                    </tbody>
                </table>
                {paginationData.maxPage > 0 ? <Pagination /> : <></>}
            </div >


        </>

    )
}

export default ReportTable