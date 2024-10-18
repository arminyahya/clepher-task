import React, { Suspense } from 'react';
import Tab from './tab';
import { Outlet } from 'react-router-dom';

interface TabsProps {
  tabs: { to: string; label: string }[];
}

 const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex border-b border-gray-200 h-10">
        {tabs.map((tab, index) => (
          <Tab key={index} to={tab.to} label={tab.label} />
        ))}
      </div>
      <div className="p-4 bg-white rounded-b-lg flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Tabs;