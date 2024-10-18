import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Tabs } from "../components/layout/tabs";
import { lazy } from "react";

const SimpleStockTable = lazy(() => import('../pages/simple-stock-table'));
const VirtualizedStockTable = lazy(() => import('../pages/virtualized-stock-tablels'));

const Layout = () => {
  const tabs = [
    { to: '/', label: 'simple' },
    { to: '/virtualized', label: 'virtualized' },
  ];

  return (
    <div className="container mx-auto mt-8 h-full w-full">
      <Tabs tabs={tabs} />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <SimpleStockTable /> },
      { path: '/virtualized', element: <VirtualizedStockTable /> },
    ],
  },
]);

export default router;