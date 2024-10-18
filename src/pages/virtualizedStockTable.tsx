import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { getStocks } from '../utils/services';
import Dropdown from '../components/ui/dropdown';
import VirtualizedTable from '../components/ui/virtualizedTable';
import { StockSymbolType } from '../types';

export default function VirtualizedStockTable() {
    const [data, setData] = useState<any>([]);
    const [selectedSymbol, setSelectedSymbol] = useState<StockSymbolType>('IBM');
    const [loading, setLoading] = useState(true);
    const columns = useMemo(() => [
        {
            dataIndex: 'timestamp',
            title: 'Timestamp',
        },
        {
            dataIndex: '1. open',
            title: 'Open',
        },
        {
            dataIndex: '2. high',
            title: 'High',
        },
        {
            dataIndex: '3. low',
            title: 'Low',
        },
        {
            dataIndex: '4. close',
            title: 'Close',
        },
        {
            dataIndex: '5. volume',
            title: 'Volume',
        }
    ], []);

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

    const handleSymbolChange = (symbol: string) => {
        setLoading(true);
        setSelectedSymbol(symbol as StockSymbolType);
    }

    return (
        <div className={`w-full h-full flex flex-col`} >
            <div className='w-full h-18'>
                <h1 className='text-2xl font-bold inline-block mx-4'>Time Series (5min) For </h1>
                <Dropdown defaultValue={'IBM'} options={['IBM', 'AAPL']} onSelect={handleSymbolChange} className='my-4 rounded-md' />
            </div>
            <VirtualizedTable columns={columns} data={defferedValue} className={loading ? 'opacity-50' : 'opacity-100'} />
        </div>
    )
}