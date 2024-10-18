import React, { useEffect, useState } from 'react';

const useAutoSizer = ({ outerListRef }: { outerListRef: HTMLElement | null}) => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const element = outerListRef;

        if (!element || !element.parentElement) return;
        console.log(element.parentElement)
        const updateSize = () => {
            const parent = element.parentElement;

            setSize({
                width: (parent as HTMLElement).clientWidth,
                height: (parent as HTMLElement).clientHeight,
            });
        };

        const resizeObserver = new ResizeObserver(updateSize);

        // Observe the parent element
        resizeObserver.observe(element.parentElement);

        // Initial size measurement
        updateSize();

        return () => {
            resizeObserver.unobserve(element.parentElement as HTMLElement);
        };
    }, [outerListRef]);

    return size;
};

export default useAutoSizer;