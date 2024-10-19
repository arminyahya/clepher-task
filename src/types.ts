export type StockSymbol = 'IBM' | 'AAPL' | 'AMD';
export interface StockData {
    timestamp: string;   
    "1. open": string;   
    "2. high": string;   
    "3. low": string;    
    "4. close": string;  
    "5. volume": string; 
  };