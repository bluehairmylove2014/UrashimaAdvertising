import React from 'react';

type accessPageTemplateParams = {
  children: React.ReactNode;
};

const AccessPageTemplate = ({ children }: accessPageTemplateParams) => {
  return <div className="w-screen h-screen">{children}</div>;
};

export default AccessPageTemplate;
