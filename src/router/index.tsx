import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
} from "react-router-dom";
import { lazy } from "react";
import LayoutContainer from "../components/layout/layout-container";

const SimpleStockTable = lazy(() => import('../pages/basicStockTable'));
const VirtualizedStockTable = lazy(() => import('../pages/virtualizedStockTable'));
const PaginationStockTable = lazy(() => import('../pages/paginatedStockTable'));

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