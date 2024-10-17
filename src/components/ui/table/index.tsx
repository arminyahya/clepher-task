import React from 'react';
import { FixedSizeList as List } from 'react-window';
import Row from './row';
import { ColumnType } from '../table-no-react-window';
import { AutoSizer } from 'react-virtualized';

interface VirtualizedTableProps {
    columns: ColumnType[];
    data: any[];
    className: string;
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = ({ data, columns, className}) => {
    const rowHeight = 35;
    const itemCount = data.length;
    return (
        <div className={"w-full h-full overflow-x-auto " + className } >
            <div className="min-w-full bg-white" style={{height: '100%', width: '100%'}}>
                <div className="bg-gray-100">
                    <div className='flex w-full'>
                        {columns.map(col => (
                            <div className="flex-1 py-2 px-4 border-b text-center">{col.title}</div>
                        ))}
                    </div>
                </div>
                <AutoSizer>
                {({ height, width }) => (
                <List
                    height={height - 50}
                    itemCount={itemCount}
                    itemSize={rowHeight}
                    width={width}
                >
                    {({ index, style }) => <Row index={index} style={style} data={data} columns={columns} />}
                </List>)}
                </AutoSizer>
            </div>
        </div>
    );
};


export default VirtualizedTable;
