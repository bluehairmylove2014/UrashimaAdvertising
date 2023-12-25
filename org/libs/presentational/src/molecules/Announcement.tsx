import CustomButtonIcon from "@presentational/atoms/CustomButtonIcon";
import CustomImage from "@presentational/atoms/CustomImage"
import { useState } from "react";

function Announcement({ handleClose }: { handleClose: () => void }) {
    const [itemsToShow, setItemsToShow] = useState(3);
    const reportResponse = [
        {
            time: "1 days ago",
            content: "In this example, the overflow-hidden class is used to hide any content that overflows its container. The line-clamp-3 class is a utility class provided by Tailwind CSS to set the -webkit-line-clamp property to limit the number of lines to 3."
        },
        {
            time: "1 days ago",
            content: "In this example, the overflow-hidden class is used to hide any content that overflows its container. The line-clamp-3 class is a utility class provided by Tailwind CSS to set the -webkit-line-clamp property to limit the number of lines to 3."
        },
        {
            time: "1 days ago",
            content: "In this example, the overflow-hidden class is used to hide any content that overflows its container. The line-clamp-3 class is a utility class provided by Tailwind CSS to set the -webkit-line-clamp property to limit the number of lines to 3."
        },
        {
            time: "1 days ago",
            content: "In this example, the overflow-hidden class is used to hide any content that overflows its container. The line-clamp-3 class is a utility class provided by Tailwind CSS to set the -webkit-line-clamp property to limit the number of lines to 3."
        },
        {
            time: "1 days ago",
            content: "In this example, the overflow-hidden class is used to hide any content that overflows its container. The line-clamp-3 class is a utility class provided by Tailwind CSS to set the -webkit-line-clamp property to limit the number of lines to 3."
        },
    ];

    const showmore = () => {
        setItemsToShow(reportResponse.length);
    };

    const showless = () => {
        setItemsToShow(3);
    };

    return (
        <div className="shadow-md min-w-[40vh]  w-[22%] fixed z-40 rounded mr-2 mt-1" style={{ right: 0 }}>
            <section className=" relative py-2 bg-neutral-100 rounded">
                <div className="flex mb-1 justify-between mx-2">
                    <p className="text-[0.65rem] font-bold text-blue-700">THÔNG BÁO</p>
                    <div className="">
                        <CustomButtonIcon
                            widthIcon="0.3rem"
                            heightIcon="0.3rem"
                            type="button"
                            bgColor="bg-blue-700"
                            round={5}
                            padding={6}
                            pathImage="/assets/close.png"
                            alt=""
                            onClick={handleClose}
                        >
                            {' '}
                        </CustomButtonIcon>
                    </div>
                </div>

                <hr></hr>


                <div className='h-[14.5rem] overflow-y-scroll scrollbar'>

                    {reportResponse.slice(0, itemsToShow).map((item, index) => (
                        <div key={index}>
                            <div className='py-1 px-2 font-medium text-[0.55rem] bg-white text-gray-500 hover:text-white hover:bg-blue-800 w-[100%]'>
                                <div className='flex'>
                                    <div className="mt-1">
                                        <CustomImage
                                            src="/assets/news.png"
                                            alt="location"
                                            width="1.5rem"
                                            height="1.5rem"
                                        />
                                    </div>

                                    <div className='overflow-hidden line-clamp-3 ml-2'>
                                        {item.content}
                                    </div>
                                </div>
                                <div className='flex mt-1 flex-row justify-between items-center'>
                                    <button className="text-[0.5rem] text-white bg-blue-600 rounded px-1" disabled>
                                        <i className="fi fi-sr-star" ></i>
                                    </button>

                                    <div className='flex'>
                                        <i className="fi fi-sr-clock-three w-2 h-2 mr-1"></i>
                                        <p className='text-right text-[0.55rem] font-semibold'>{item.time}</p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
                <hr />
                <button className='text-blue-700 hover:text-blue-800 hover:underline mt-1 text-[0.65rem] font-semibold text-center w-full' onClick={itemsToShow === 3 ? showmore : showless}>
                    {itemsToShow === 3 ? 'Xem tất cả' : 'Ẩn bớt'}
                </button>
            </section>
        </div>
    );
}

export default Announcement;