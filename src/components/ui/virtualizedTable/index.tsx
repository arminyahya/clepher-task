import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import Row from './row';
import { ColumnType } from '../basicTable';
import useVerticalScrollbarMeasure from '../../../hooks/useVerticalScrollbarMeasure';
import useAutoSizer from '../../../hooks/useAutoSizer';
import { virtualizedTableHeadersHeight, virtualizedTableRowHeight } from '../../../constants/style';

interface VirtualizedTableProps {
    columns: ColumnType[];
    data: any[];
    className: string;
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = ({ data, columns, className }) => {
    const itemCount = data.length;
    const listRef = useRef<HTMLElement>(null);
    const [scrolbarWidth] = useVerticalScrollbarMeasure({ listRef });
    const { height, width } = useAutoSizer({ listRef });
    return (
        <div className={"w-full flex-1 overflow-x-auto bg-white " + className}>
            <div className="bg-gray-100 h-[40px]">
                <div className='flex w-full h-full'>
                    {columns.map(col => (
                        <div className="flex-1 py-2 px-4 border-b text-left font-medium">{col.title}</div>
                    ))}
                    <div style={{ width: scrolbarWidth }}></div>
                </div>
            </div>
            <List
                height={height - virtualizedTableHeadersHeight}
                itemCount={itemCount}
                itemSize={virtualizedTableRowHeight}
                width={width}
                outerRef={listRef}
            >
                {({ index, style }) => <Row index={index} style={style} data={data} columns={columns} />}
            </List>
        </div>
    );
};


export default memo(VirtualizedTable);
