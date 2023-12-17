import OfficerHeader from '@presentational/organisms/OfficerHeader';
import React from 'react';

const OfficerMainTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen">
      <OfficerHeader />
      {children}
    </div>
  );
};

export default OfficerMainTemplate;
