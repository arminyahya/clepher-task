import React, { useEffect, useRef, useState } from 'react';
import getVerticalScrollbarWidth from '../utils/getVerticalScrollbarWidth';


export default function useVerticalScrollbarMeasure({ outerListRef }: { outerListRef: HTMLElement | null}) {
    const [scrolbarWidth, setScrollbarWidth] = useState(0);
   
    useEffect(() => {
        if (!outerListRef) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === outerListRef) {
                    setScrollbarWidth(getVerticalScrollbarWidth(outerListRef as HTMLElement))

                }
            }
        });

        resizeObserver.observe(outerListRef);

        return () => {
            if (outerListRef) {
                resizeObserver.unobserve(outerListRef);
            }
        };
    }, []);

    return [
        scrolbarWidth
    ]
}
