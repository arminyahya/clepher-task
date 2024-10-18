import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Tabs } from "../components/layout/tabs";
import { lazy } from "react";
import LayoutContainer from "../components/layout/layout-container";

const SimpleStockTable = lazy(() => import('../pages/simple-stock-table'));
const VirtualizedStockTable = lazy(() => import('../pages/virtualized-stock-table'));
const PaginationStockTable = lazy(() => import('../pages/pagination-stock-table'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutContainer />,
    children: [
      { index: true, element: <SimpleStockTable /> },
      { path: '/virtualized', element: <VirtualizedStockTable /> },
      { path: '/pagination', element: <PaginationStockTable /> },

    ],
  },
]);

export default router;