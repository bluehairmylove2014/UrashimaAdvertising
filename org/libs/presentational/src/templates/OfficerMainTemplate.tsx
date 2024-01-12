import NavigateLoader from '@presentational/atoms/NavigateLoader';
import OfficerHeader from '@presentational/organisms/OfficerHeader';
import React from 'react';
import ViewLocationMap from '@presentational/organisms/ViewLocationMap';

const OfficerMainTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen">
      <OfficerHeader />
      <NavigateLoader />
      <ViewLocationMap isOfficer={true}/>

      {children}
    </div>
  );
};

export default OfficerMainTemplate;
