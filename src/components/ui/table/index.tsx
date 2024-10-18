import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import Row from './row';
import { ColumnType } from '../table-no-react-window';
import { AutoSizer } from 'react-virtualized';
import getVerticalScrollbarWidth from '../../../utils/getVerticalScrollbarWidth';
import useVerticalScrollbarMeasure from '../../../hooks/useVerticalScrollbarMeasure';

interface VirtualizedTableProps {
    columns: ColumnType[];
    data: any[];
    className: string;
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = ({ data, columns, className }) => {
    const rowHeight = 35;
    const itemCount = data.length;
    const outerListRef = useRef<HTMLDivElement>(null);
    const [scrolbarWidth] = useVerticalScrollbarMeasure({ outerListRef: outerListRef as any});

    return (
            <div className={"w-full flex-1 overflow-x-auto bg-white " + className}>
                <div className="bg-gray-100">
                    <div className='flex w-full'>
                        {columns.map(col => (
                            <div className="flex-1 py-2 px-4 border-b text-left font-medium">{col.title}</div>
                        ))}
                        <div style={{ width: scrolbarWidth }}></div>
                    </div>
                </div>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height - 50}
                            itemCount={itemCount}
                            itemSize={rowHeight}
                            width={width}
                            outerRef={outerListRef}
                            className='react-window-list'

                        >
                            {({ index, style }) => <Row index={index} style={style} data={data} columns={columns} />}
                        </List>)}
                </AutoSizer>
            </div>
    );
};


export default VirtualizedTable;
