import React from 'react';
import Tabs from './tabs';

const LayoutContainer = () => {
    const tabs = [
        { to: '/', label: 'Simple' },
        { to: '/virtualized', label: 'Virtualized' },
        { to: '/pagination', label: 'Pagination' },

    ];

    return (
        <div className="container mx-auto py-8 h-full w-full">
            <Tabs tabs={tabs} />
        </div>
    );
};

export default LayoutContainer;