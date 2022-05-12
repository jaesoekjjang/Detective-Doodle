import React from 'react';

interface BaseLayoutProps {
  children: React.ReactChild;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return <div className="flex justify-center items-center h-screen w-screen">{children}</div>;
};

export default BaseLayout;
