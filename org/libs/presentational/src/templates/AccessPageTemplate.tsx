import Notification from '@presentational/atoms/Notification';
import React from 'react';

type accessPageTemplateParams = {
  children: React.ReactNode;
};

const AccessPageTemplate = ({ children }: accessPageTemplateParams) => {
  return (
    <div className="w-screen h-screen">
      <Notification />
      {children}
    </div>
  );
};

export default AccessPageTemplate;
