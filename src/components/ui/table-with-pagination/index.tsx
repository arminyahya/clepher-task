import React, { memo, useMemo, useRef, useState } from 'react';
import { paginationSize } from '../../../utils/constants';
import useVerticalScrollbarMeasure from '../../../hooks/useVerticalScrollbarMeasure';
import Pagination from '../pagination';

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
    const [scrolbarWidth] = useVerticalScrollbarMeasure({ outerListRef: outerListRef as any });
    const [currentPage, setCurrentPage] = useState(1);
    const pages = useMemo(() => {
        setCurrentPage(1);
        const m = new Map();
        for (let i = 0; i <= Math.ceil(data.length / paginationSize); i++) {
            m.set(i + 1, data.slice(i * paginationSize, (i * paginationSize) + paginationSize))

        }
        return m;
    }, [data]);

    const currentPageData: any[] = pages ? pages.get(currentPage) : [];

    return (
        <div className="overflow-hidden h-full">
            <div className='bg-white overflow-hidden'>
                <table className="w-full ">
                    <thead className="bg-gray-100">
                        <tr className='flex w-full'>
                            {columns.map(col => (
                                <th className="flex-1 py-2 px-4 border-b text-left font-medium">{col.title}</th>
                            ))}
                            <th style={{ width: scrolbarWidth }}></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className={`overflow-y-auto h-[${height}px]`} ref={outerListRef}>
                <table className="bg-white h-full w-full overflow-hidden">
                    <tbody >
                        {
                            currentPageData.map(d => (
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
            <Pagination currentPage={currentPage} totalPages={Math.ceil(data.length / paginationSize)} onPageChange={setCurrentPage} />
        </div>
    )
}

export default memo(Table);