'use client'
import CustomImage from "@presentational/atoms/CustomImage";

function DetailReport() {
    return (
        <div className="h-[100%] w-[25%] p-2 bg-white shadow-md min-w-[45vh] fixed" style={{ left: 0, top: 0 }}>
            {/* Title history report */}
            <div className="flex justify-center mt-2">
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

            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
                    <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active" id="tabs-with-underline-item-1" data-hs-tab="#tabs-with-underline-1" aria-controls="tabs-with-underline-1" role="tab">
                        Tab 1
                    </button>
                    <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500" id="tabs-with-underline-item-2" data-hs-tab="#tabs-with-underline-2" aria-controls="tabs-with-underline-2" role="tab">
                        Tab 2
                    </button>
                    <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500" id="tabs-with-underline-item-3" data-hs-tab="#tabs-with-underline-3" aria-controls="tabs-with-underline-3" role="tab">
                        Tab 3
                    </button>
                </nav>
            </div>

            <div className="mt-3">
                <div id="tabs-with-underline-1" role="tabpanel" aria-labelledby="tabs-with-underline-item-1">
                    <p className="text-gray-500 dark:text-gray-400">
                        This is the <em className="font-semibold text-gray-800 dark:text-gray-200">first</em> item's tab body.
                    </p>
                </div>
                <div id="tabs-with-underline-2" className="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
                    <p className="text-gray-500 dark:text-gray-400">
                        This is the <em className="font-semibold text-gray-800 dark:text-gray-200">second</em> item's tab body.
                    </p>
                </div>
                <div id="tabs-with-underline-3" className="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-3">
                    <p className="text-gray-500 dark:text-gray-400">
                        This is the <em className="font-semibold text-gray-800 dark:text-gray-200">third</em> item's tab body.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetailReport;