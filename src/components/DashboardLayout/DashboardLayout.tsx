import React, { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="bg-gray-200 h-16 flex items-center justify-center">Dashboard Header</div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
