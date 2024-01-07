import HQNavbar from '@presentational/organisms/HQNavbar';
import React from 'react';

const HeadquarterTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen grid grid-cols-5 grid-rows-1 gap-0">
      <div className="col-span-1">
        <HQNavbar />
      </div>
      <div className="col-span-4 mx-8">{children}</div>
    </div>
  );
};

export default HeadquarterTemplate;
