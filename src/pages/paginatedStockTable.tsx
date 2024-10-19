import React, { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { getStocks } from '../utils/services';
import Dropdown from '../components/ui/dropdown';
import PaginatedTable from '../components/ui/paginatedTable';
import { StockData, StockSymbol } from '../types';
import stockTableColumns from '../constants/stockTableColumns';
import { stockSymbols } from '../constants/stockSymbols';
import { RequestLimitMessage } from '../constants/errorMessages';

export default function PaginatedStockTable() {
    const [data, setData] = useState<StockData[]>([]);
    const [selectedSymbol, setSelectedSymbol] = useState<StockSymbol>('IBM');
    const [loading, setLoading] = useState(true);
    const defferedValue = useDeferredValue(data)
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            const result = await getStocks({ selectedSymbol });
            if (result['Time Series (5min)']) {
                setLoading(false);
                setError('')
                setData(Object.entries<Omit<StockData, "timestamp">>(result['Time Series (5min)']).map(([timestamp, values]) => ({
                    timestamp,
                    ...values
                }
                )));
            } else {
                setError(RequestLimitMessage);
            }
        })()
    }, [selectedSymbol]);

    const handleSymbolChange = useCallback((symbol: string) => {
        setLoading(true);
        setSelectedSymbol(symbol as StockSymbol);
    }, [])

    return (
        <div className={`w-full h-full `}>
            {error}
            <div className='w-full h-18'>
                <h1 className='text-2xl font-bold inline-block mx-4'>Time Series (5min) For </h1>
                <Dropdown defaultValue={'IBM'} options={stockSymbols} onSelect={handleSymbolChange} className='my-4 rounded-md' />
            </div>
            <PaginatedTable columns={stockTableColumns} data={defferedValue} className={loading ? 'opacity-50' : 'opacity-100'} height={400} />
        </div>
    )
}