import React from 'react';
import { NavLink, } from 'react-router-dom';

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

export default Tab;