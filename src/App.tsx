import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getStocks } from './utils/services';
import StockTable from './components/features/stockTable';

function App() {

  return (
    <StockTable />
  );
}

export default App;
