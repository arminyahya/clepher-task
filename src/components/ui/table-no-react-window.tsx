import React, { memo } from 'react';

export interface ColumnType {
    dataIndex: string;
    title: string;
    renderer?: ({ item }: { item: any }) => React.ReactNode;
}

interface Props {
    data: any[];
    columns: ColumnType[];
}

function Table(props: Props) {
    const { columns, data } = props;
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map(col => (
                            <th className="py-2 px-4 border-b text-center">{col.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(d => (
                            <tr>
                                {columns.map(col => (
                                    <td className="py-2 px-4 border-b text-center">{col.renderer ? col.renderer({ item: d }) : d[col.dataIndex] as string}</td>

                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default memo(Table);