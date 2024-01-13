import React, { useState, useEffect } from 'react';

const Notification: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`absolute shadow-md bg-white z-40 rounded mt-4 mr-2 ${isVisible ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-5000 ease-in-out`}
            style={{ right: 0, top: 0 }}
        >
            {isVisible && (
                <div className="bg-blue-100 border-t-4 border-blue-600 rounded-b text-blue-900 px-4 py-3 shadow-md" role="alert">
                    <div className="flex">
                        <div className="inline-block relative mr-2">
                            <i className="fi fi-ss-bell text-lg text-yellow-400"></i>
                            <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-rose-600 bg-rose-800"></span>
                        </div>
                        <div>
                            <p className="font-bold">THÔNG BÁO</p>
                            <p className="text-sm">Báo cáo của bạn đã được xử lý</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;