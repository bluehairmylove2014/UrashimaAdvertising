'use client';
import CustomImage from '@presentational/atoms/CustomImage';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useState, useEffect, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';
import { IAdReport, ILocationReport } from '@business-layer/services/entities';

import {
  useGetAdReports,
  useGetLocationReports,
} from '@business-layer/business-logic/lib/report';
import { TabPanel } from '@material-tailwind/react';

const formReport = [
  'Tất cả hình thức báo cáo',
  'Tố giác sai phạm',
  'Đóng góp ý kiến',
  'Đăng ký nội dung',
  'Giải đáp thắc mắc',
];

function DetailReport({
  handleClose,
  handleDetailAdsBoard,
  handleDetailAdsPoint,
}: {
  handleClose: () => void;
  handleDetailAdsBoard: (adsBoard: IAdReport) => void;
  handleDetailAdsPoint: (adsPoint: ILocationReport) => void;
}) {
  const [selectedFormReport, setSelectedFormReport] = useState(formReport[0]);
  const adReportsData = useGetAdReports();
  const locationReportData = useGetLocationReports();
  const [isEmpty, setIsEmpty] = useState(true);

  const adReportsDataCurrent = useMemo(() => {
    if (selectedFormReport === 'Tất cả hình thức báo cáo') {
      return adReportsData;
    } else {
      return adReportsData?.filter(
        (report) => report.reportType === selectedFormReport
      );
    }
  }, [selectedFormReport]);

  const locationReportDataCurrent = useMemo(() => {
    if (selectedFormReport === 'Tất cả hình thức báo cáo') {
      return locationReportData;
    } else {
      return locationReportData?.filter(
        (report) => report.reportType === selectedFormReport
      );
    }
  }, [selectedFormReport]);

  useEffect(() => {
    if (
      (adReportsDataCurrent === undefined ||
        adReportsDataCurrent?.length == 0) &&
      (locationReportDataCurrent === undefined ||
        locationReportDataCurrent?.length == 0)
    ) {
      setIsEmpty(true);
    } else setIsEmpty(false);
  }, [adReportsDataCurrent, locationReportDataCurrent]);

  return (
    <div
      className="h-[100%] w-[25%] bg-white shadow-md min-w-[45vh] fixed overflow-y-scroll scrollbar z-40"
      style={{ left: 0, top: 0 }}
    >
      {/* Close button */}
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

      {/* Title history report */}
      <div className="flex justify-center mt-2 p-2">
        <div className="flex flex-row items-center text-neutral-700">
          <CustomImage
            src="/assets/history.png"
            alt="Ads Form"
            width="0.9rem"
            height="0.9rem"
          />
          <p className="text-center text-[0.9rem] font-bold ml-1">
            LỊCH SỬ BÁO CÁO
          </p>
        </div>
      </div>

      {/* Show list report form from each tab */}
      <div className="my-3">
        <Tab.Group>
          {/* title tab */}
          <Tab.List className="flex h-[100%]">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2 text-[0.7rem] font-medium leading-5 border-solid border-x-0 border-t-0 border-1',
                  selected
                    ? ' border-blue-700 text-blue-700'
                    : ' border-gray-200 text-gray-600 hover:bg-gray-200 hover:rounded-full'
                )
              }
            >
              Tất cả báo cáo
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2 text-[0.7rem] font-medium leading-5 border-solid border-x-0 border-t-0 border-1',
                  selected
                    ? ' border-blue-700 text-blue-700'
                    : ' border-gray-200 text-gray-600 hover:bg-gray-200 hover:rounded-full'
                )
              }
            >
              Đang xét duyệt
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2 text-[0.7rem] font-medium leading-5 border-solid border-x-0 border-t-0 border-1 ',
                  selected
                    ? ' border-blue-700 text-blue-700'
                    : ' border-gray-200 text-gray-600 hover:bg-gray-200 hover:rounded-full'
                )
              }
            >
              Đã xét duyệt
            </Tab>
          </Tab.List>

          {/* Listbox form report */}
          <Listbox value={selectedFormReport} onChange={setSelectedFormReport}>
            <div className="relative m-3">
              <Listbox.Button className="relative text-[0.7rem] w-[100%] cursor-default rounded-sm bg-white border-solid border-[0.6px] border-gray-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300">
                <span className="block truncate">{selectedFormReport}</span>
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

          {/* List report */}
          <Tab.Panels>
            {isEmpty ? (
              <Tab.Panel>
                <div className="mx-3 text-green-600">
                  <p>Không có báo cáo ở danh mục này</p>
                </div>
              </Tab.Panel>
            ) : (
              <Tab.Panel>
                {/* List ads board report */}
                {adReportsDataCurrent?.map((report) => (
                  <div
                    className="mx-3 bg-white p-2 border rounded-lg font-bold cursor-pointer hover:shadow-lg focus:shadow-lg mt-3"
                    key={report.content}
                    onClick={() => handleDetailAdsBoard(report)}
                  >
                    <div className="flex justify-between text-xs">
                      <p className="text-neutral-600">{report.reportType}</p>
                      {/* <p className="text-green-600 text-[0.7rem]">
                        ĐÃ XÉT DUYỆT
                      </p> */}
                      <p className="text-rose-600 text-[0.7rem]">
                        ĐANG XÉT DUYỆT
                      </p>
                    </div>
                    <hr className="my-2" />
                    <div className="mt-2 flex w-[100%]">
                      <div className="w-[30%] min-w-[30%] h-[12vh] rounded  overflow-hidden mr-1">
                        <CustomImage
                          src="/assets/billboardExample.png"
                          alt="Ads Form"
                          width="100%"
                          height="100%"
                        />
                      </div>

                      <div className="font-medium text-gray-600 truncate">
                        <p className=" text-[0.6rem] whitespace-normal font-bold">
                          Báo cáo về điểm đặt quảng cáo
                        </p>
                        <p className=" text-[0.6rem] whitespace-normal">
                          Loaị bảng quảng cáo:
                          <span className="font-semibold">
                            {' '}
                            {report.reportData.adsType}
                          </span>
                        </p>

                        <p className=" text-[0.6rem]">
                          Nội dung:
                          <span className="font-semibold">
                            {report.content}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* List Location Report */}
                {locationReportDataCurrent?.map((report) => (
                  <div
                    className="mx-3 bg-white p-2 border rounded-lg font-bold cursor-pointer hover:shadow-lg focus:shadow-lg mt-3"
                    key={report.content}
                    onClick={() => handleDetailAdsPoint(report)}
                  >
                    <div className="flex justify-between">
                      <p className="text-neutral-600">{report.reportType}</p>
                      <p className="text-green-600 text-[0.7rem]">
                        ĐÃ XÉT DUYỆT
                      </p>
                      {/* <p className="text-green-600 italic text-right mt-2">
                ĐANG XÉT DUYỆT
              </p> */}
                    </div>
                    <hr className="my-2" />

                    <div className="mt-1 flex w-[100%]">
                      {report.reportData ? (
                        // Report AdsPoint have ReportData
                        <>
                          <div className="w-[30%] min-w-[30%] h-[12vh] rounded  overflow-hidden mr-1">
                            <CustomImage
                              src="/assets/billboardExample.png"
                              alt="Ads Form"
                              width="100%"
                              height="100%"
                            />
                          </div>

                          <div className="font-medium text-gray-600 truncate">
                            <p className=" text-[0.6rem] whitespace-normal font-bold">
                              Báo cáo về điểm quảng cáo
                            </p>
                            <p className=" text-[0.6rem] whitespace-normal">
                              Địa điểm:
                              <span className="font-semibold">
                                {' '}
                                {report.reportData.address}
                              </span>
                            </p>

                            <p className=" text-[0.6rem]">
                              Nội dung:
                              <span className="font-semibold">
                                {report.content}
                              </span>
                            </p>
                          </div>
                        </>
                      ) : (
                        // Report Point doesnt have ReportData
                        <div className="ml-1 font-medium text-gray-600 truncate  w-[100%]">
                          <div className="flex w-[100%]">
                            <div className="w-[30%] mr-1">
                              <CustomImage
                                src="/assets/billboardExample.png"
                                alt="Ads Form"
                                width="100%"
                                height="100%"
                              />
                            </div>
                            <div>
                              <p className=" text-[0.6rem] whitespace-normal font-bold">
                                Báo cáo về một địa điểm trên bản đồ
                              </p>
                              <p className=" text-[0.6rem] whitespace-normal">
                                Vĩ độ:
                                <span className="font-semibold">
                                  {' '}
                                  {report.latitude}
                                </span>
                              </p>
                              <p className=" text-[0.6rem] whitespace-normal">
                                Kinh độ:
                                <span className="font-semibold">
                                  {' '}
                                  {report.longitude}
                                </span>
                              </p>
                              <p className=" text-[0.6rem]">
                                Nội dung:
                                <span className="font-semibold">
                                  {report.content}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Tab.Panel>
            )}

            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default DetailReport;
