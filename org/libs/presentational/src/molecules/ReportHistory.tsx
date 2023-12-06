import CustomImage from "@presentational/atoms/CustomImage";
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Carousel } from 'react-responsive-carousel';


const formReport = [
    'Tất cả hình thức báo cáo',
    'Tố giác sai phạm',
    'Đóng góp ý kiến',
    'Đăng ký nội dung',
    'Giải đáp thắc mắc'
]

function DetailReport() {
    const [selectedFormReport, setSelectedFormReport] = useState(formReport[0])

    return (
        <div className="h-[100%] w-[25%] bg-white shadow-md min-w-[45vh] fixed overflow-y-scroll scrollbar" style={{ left: 0, top: 0 }}>
            {/* Title history report */}
            <div className="flex justify-center mt-2 p-2">
                <div className="flex flex-row items-center text-neutral-700">
                    <CustomImage
                        src="/assets/history.png"
                        alt="Ads Form"
                        width="0.9rem"
                        height="0.9rem"
                    />
                    <p className='text-center text-[0.9rem] font-bold ml-1'>LỊCH SỬ BÁO CÁO</p>
                </div>
            </div>

            {/* Show list report form from each tab */}
            <div className='mt-3'>
                <Tab.Group>
                    {/* title tab */}
                    <Tab.List className='flex h-[100%]' >
                        <Tab className={({ selected }) => classNames('w-full py-2 text-[0.7rem] font-medium leading-5 border-solid border-x-0 border-t-0 border-1',
                            selected ? ' border-blue-700 text-blue-700' : ' border-gray-200 text-gray-600 hover:bg-gray-200 hover:rounded-full')} >
                            Tất cả báo cáo
                        </Tab>
                        <Tab className={({ selected }) => classNames('w-full py-2 text-[0.7rem] font-medium leading-5 border-solid border-x-0 border-t-0 border-1',
                            selected ? ' border-blue-700 text-blue-700' : ' border-gray-200 text-gray-600 hover:bg-gray-200 hover:rounded-full')}>
                            Đang xét duyệt
                        </Tab>
                        <Tab className={({ selected }) => classNames('w-full py-2 text-[0.7rem] font-medium leading-5 border-solid border-x-0 border-t-0 border-1 ',
                            selected ? ' border-blue-700 text-blue-700' : ' border-gray-200 text-gray-600 hover:bg-gray-200 hover:rounded-full')}>
                            Đã xét duyệt
                        </Tab>
                    </Tab.List>

                    {/* Listbox form report */}
                    <Listbox value={selectedFormReport} onChange={setSelectedFormReport}>
                        <div className="relative m-3 ">
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
                                            {({ selectedFormReport }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selectedFormReport ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {form}
                                                    </span>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>

                    {/* List report */}
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className='mx-3 bg-white p-2 border border-1 font-bold cursor-pointer hover:shadow-lg focus:shadow-lg mt-3'>
                                <div className="flex justify-between ">
                                    <p className='text-neutral-600'>
                                        Tố giác sai phạm
                                    </p>
                                    <CustomImage
                                        src="/assets/bin_report.png"
                                        alt="Ads Form"
                                        width="0.8rem"
                                        height="0.8rem"
                                    />
                                </div>
                                <div className='mt-2 flex '>
                                    <div className='w-[50%] h-[12vh] z-1'>
                                        <CustomImage
                                            src="/assets/billboardExample.png"
                                            alt="Ads Form"
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>

                                    <div className='ml-1 font-medium text-gray-500 truncate '>
                                        <p className=' text-[0.6rem]'>Địa điểm:
                                            <span className='font-semibold'> Trụ, cụm pano</span> </p>
                                        <p className=' text-[0.6rem] whitespace-normal'>Địa chỉ:
                                            <span className='font-semibold'> 227 Nguyen Van Cu, Phuong 4, Quan 5, TPHCM</span></p>
                                        <p className=' text-[0.6rem]'>Nội dung:
                                            <span className='font-semibold'> Tôi cảm thấy vị trí này không được hợp lý đặt quảng cáo
                                            </span></p>
                                    </div>
                                </div>

                                <p className='text-rose-600 italic text-right mt-2'>
                                    ĐÃ XÉT DUYỆT
                                </p>
                            </div>
                            <div className='mx-3 bg-white p-2 border border-1 font-bold cursor-pointer hover:shadow-lg focus:shadow-lg mt-3'>
                                <div className="flex justify-between ">
                                    <p className='text-neutral-600'>
                                        Tố giác sai phạm
                                    </p>
                                    <CustomImage
                                        src="/assets/bin_report.png"
                                        alt="Ads Form"
                                        width="0.8rem"
                                        height="0.8rem"
                                    />
                                </div>
                                <div className='mt-2 flex '>
                                    <div className='w-[50%] h-[12vh]'>
                                        <CustomImage
                                            src="/assets/billboardExample.png"
                                            alt="Ads Form"
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>

                                    <div className='ml-1 font-medium text-gray-500 truncate '>
                                        <p className=' text-[0.6rem]'>Địa điểm:
                                            <span className='font-semibold'> Trụ, cụm pano</span> </p>
                                        <p className=' text-[0.6rem] whitespace-normal'>Địa chỉ:
                                            <span className='font-semibold'> 227 Nguyen Van Cu, Phuong 4, Quan 5, TPHCM</span></p>
                                        <p className=' text-[0.6rem]'>Nội dung:
                                            <span className='font-semibold'> Tôi cảm thấy vị trí này không được hợp lý đặt quảng cáo
                                            </span></p>
                                    </div>
                                </div>

                                <p className='text-green-600 italic text-right mt-2'>
                                    ĐANG XÉT DUYỆT
                                </p>
                            </div>

                        </Tab.Panel>
                        <Tab.Panel>Content 2</Tab.Panel>
                        <Tab.Panel>Content 3</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div >
        </div >
    )
}

export default DetailReport;