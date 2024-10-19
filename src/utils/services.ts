import { StockSymbol } from "../types";

const API_KEY = 'WX3FZ9DG9SBLII2I';
export async function getStocks({selectedSymbol}: {selectedSymbol: StockSymbol}) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${selectedSymbol}&interval=5min&apikey=${API_KEY}`;
    const result = await fetch(url);
    const jsonResult = await result.json();
    return jsonResult;
}