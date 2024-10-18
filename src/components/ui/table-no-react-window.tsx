import React, { memo, useRef } from 'react';
import useVerticalScrollbarMeasure from '../../hooks/useVerticalScrollbarMeasure';

export interface ColumnType {
    dataIndex: string;
    title: string;
    renderer?: ({ item }: { item: any }) => React.ReactNode;
}

interface Props {
    data: any[];
    columns: ColumnType[];
    className?: string;
    height: number;
}

function Table(props: Props) {
    const { columns, data, height } = props;
    const outerListRef = useRef<HTMLDivElement>(null);
    const [scrolbarWidth] = useVerticalScrollbarMeasure({ outerListRef: outerListRef as any});

    return (
        <div className="overflow-hidden h-full">
            <div className='bg-white overflow-hidden'>
            <table className="w-full ">
                <thead className="bg-gray-100">
                    <tr className='flex w-full'>
                        {columns.map(col => (
                            <th className="flex-1 py-2 px-4 border-b text-left font-medium">{col.title}</th>
                        ))}
                        <th style={{width: scrolbarWidth}}></th>
                    </tr>
                </thead>
            </table>
            </div>
            <div className={`overflow-y-auto h-[400px]`} ref={outerListRef}>
                <table className="bg-white h-full w-full overflow-hidden">
                    <tbody >
                        {
                            data.map(d => (
                                <tr className='flex w-full'>
                                    {columns.map(col => (
                                        <td className="flex-1 py-2 px-4 border-b text-left truncate">{col.renderer ? col.renderer({ item: d }) : d[col.dataIndex] as string}</td>

                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default memo(Table);