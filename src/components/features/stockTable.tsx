import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { getStocks } from '../../utils/services';
import VirtualizedTable from '../ui/table';
import { stockSymbols } from '../../utils/constants';
export type StockSymbolType = 'IBM' | 'AAPL' | 'AMD'




export default function StockTable() {
    const [data, setData] = useState<any>([]);
    const [selectedSymbol, setSelectedSymbol] = useState<StockSymbolType>('IBM');
    const [loading, setLoading] = useState(true);
    const columns = useMemo(() => [
        {
            dataIndex: 'timestamp',
            title: 'timestamp',
        },
        {
            dataIndex: '1. open',
            title: 'open',
        },
        {
            dataIndex: '2. high',
            title: 'high',
        },
        {
            dataIndex: '3. low',
            title: 'low',
        },
        {
            dataIndex: '4. close',
            title: 'close',
        },
        {
            dataIndex: '5. volume',
            title: 'volume',
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

    const handleSymbolChange = (symbol: StockSymbolType) => {
        setLoading(true);
        setSelectedSymbol(symbol);
    }

    return (
        <div className={`w-full h-full `} >
            <div className='my-4'>
                {stockSymbols.map(symbol => (
                    <div
                        className={'inline-block w-20 px-4 text-white rounded-full mx-4 text-center ' + (selectedSymbol === symbol.value ? 'bg-black text-white' : 'text-black')}
                        onClick={() => { handleSymbolChange(symbol.value) }}
                    >
                        {symbol.title}
                    </div>))}
            </div>
            <VirtualizedTable columns={columns} data={defferedValue} className={loading ? 'opacity-50' : 'opacity-100'} />
        </div>
    )
}