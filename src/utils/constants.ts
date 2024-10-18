import { StockSymbolType } from "../types";

export const stockSymbols: { title: string; value: StockSymbolType }[] = [
    {
        title: 'IBM',
        value: 'IBM'
    },
    {
        title: 'AAPL',
        value: 'AAPL'
    },
    {
        title: 'AMD',
        value: 'AMD'
    }
];
export const paginationSize = 10;
export const virtualizedTableRowHeight = 35;