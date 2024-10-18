import React, { memo, useMemo } from 'react';
import Tabs from './tabs';
import layoutTabs from '../../constants/layoutTabs';

const LayoutContainer = () => {
    return (
        <div className="container mx-auto py-8 h-full w-full">
            <Tabs tabs={layoutTabs} />
        </div>
    );
};

export default memo(LayoutContainer);