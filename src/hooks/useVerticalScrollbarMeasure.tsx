import React, { useEffect, useRef, useState } from 'react';
import getVerticalScrollbarWidth from '../utils/getVerticalScrollbarWidth';


export default function useVerticalScrollbarMeasure({ outerListRef }: { outerListRef: any }) {
    const [scrolbarWidth, setScrollbarWidth] = useState(0);
    useEffect(() => {
        console.log(outerListRef);
        if (!outerListRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === outerListRef.current) {
                    setScrollbarWidth(getVerticalScrollbarWidth(outerListRef.current as HTMLElement))

                }
            }
        });

        resizeObserver.observe(outerListRef.current);

        return () => {
            if (outerListRef.current) {
                resizeObserver.unobserve(outerListRef.current);
            }
        };
    }, []);
    return [
        scrolbarWidth
    ]
}
