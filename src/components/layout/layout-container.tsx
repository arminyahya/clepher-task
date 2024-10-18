import React from 'react';
import { Tabs } from './tabs';

const LayoutContainer = () => {
    const tabs = [
        { to: '/', label: 'Simple' },
        { to: '/virtualized', label: 'Virtualized' },
    ];

    return (
        <div className="container mx-auto mt-8 h-full w-full">
            <Tabs tabs={tabs} />
        </div>
    );
};

export default LayoutContainer;