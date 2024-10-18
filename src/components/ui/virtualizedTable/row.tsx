import React, { memo } from 'react';
import { ColumnType } from '../basicTable';

interface RowProps {
    index: number;
    style: React.CSSProperties;
    data: any[];
    columns: ColumnType[];

}
const Row: React.FC<RowProps> = ({ index, style, data, columns }) => {
    const d = data[index];
    return (
        <div className='flex w-full' style={style}>
            {columns.map(col => (
                <div className="flex-1 py-2 px-4 border-b text-left truncate">{col.renderer ? col.renderer({ item: d }) : d[col.dataIndex] as string}</div>

            ))}
        </div>
    );
}

export default memo(Row) ;