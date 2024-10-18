import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface TabProps {
  to: string;
  label: string;
}

const Tab: React.FC<TabProps> = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-2 font-medium text-md ${isActive
        ? 'bg-white text-black border-b border-black'
        : 'text-gray-500 hover:text-gray-700'
      }`
    }
  >
    {label}
  </NavLink>
);

interface TabsProps {
  tabs: Array<{ to: string; label: string }>;
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  return (
    <div className="w-full h-full">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <Tab key={index} to={tab.to} label={tab.label} />
        ))}
      </div>
      <div className="p-4 bg-white rounded-b-lg h-full w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};