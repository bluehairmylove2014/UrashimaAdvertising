import NavigateLoader from '@presentational/atoms/NavigateLoader';
import OfficerHeader from '@presentational/organisms/OfficerHeader';
import React from 'react';

const OfficerMainTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen">
      <OfficerHeader />
      <NavigateLoader />

      {children}
    </div>
  );
};

export default OfficerMainTemplate;
