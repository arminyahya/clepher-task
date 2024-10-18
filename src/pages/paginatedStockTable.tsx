import React, { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { getStocks } from '../utils/services';
import Dropdown from '../components/ui/dropdown';
import Table from '../components/ui/paginatedTable';
import { StockSymbol } from '../types';
import stockTableColumns from '../constants/stockTableColumns';
import { stockSymbols } from '../constants/stockSymbols';

export default function PaginatedStockTable() {
    const [data, setData] = useState<any>([]);
    const [selectedSymbol, setSelectedSymbol] = useState<StockSymbol>('IBM');
    const [loading, setLoading] = useState(true);
    const defferedValue = useDeferredValue(data)

    useEffect(() => {
        (async () => {
            const result = await getStocks({ selectedSymbol });
            setLoading(false);
            setData(Object.entries(result['Time Series (5min)']).map(([timestamp, values]) => ({
                timestamp,
                ...values as any
            }
            )));
        })()
    }, [selectedSymbol]);

    const handleSymbolChange = useCallback((symbol: string) => {
        setLoading(true);
        setSelectedSymbol(symbol as StockSymbol);
    }, [])

    return (
        <div className={`w-full h-full `} >
            <div className='w-full h-18'>
                <h1 className='text-2xl font-bold inline-block mx-4'>Time Series (5min) For </h1>
                <Dropdown defaultValue={'IBM'} options={stockSymbols} onSelect={handleSymbolChange} className='my-4 rounded-md' />
            </div>
            <Table columns={stockTableColumns} data={defferedValue} className={loading ? 'opacity-50' : 'opacity-100'} height={400} />
        </div>
    )
}