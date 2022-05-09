import React from 'react';

interface BaseLayoutProps {
  children: React.ReactChild;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" min-w-[60rem] h-[34rem] border-2 border-black">{children}</div>
    </div>
  );
};

export default BaseLayout;
