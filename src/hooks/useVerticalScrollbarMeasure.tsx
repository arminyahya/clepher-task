import React, { useEffect, useRef, useState } from 'react';
import getVerticalScrollbarWidth from '../utils/getVerticalScrollbarWidth';


export default function useVerticalScrollbarMeasure({ outerListRef }: { outerListRef: React.RefObject<HTMLElement | null>}) {
    const [scrolbarWidth, setScrollbarWidth] = useState(0);
   
    useEffect(() => {
        if (!outerListRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                console.log(outerListRef)
                if (entry.target === outerListRef.current) {
                    setScrollbarWidth(getVerticalScrollbarWidth(outerListRef.current as HTMLElement))

                }
            }
        });

        resizeObserver.observe(outerListRef.current as HTMLElement);

        return () => {
            if (outerListRef.current) {
                resizeObserver.unobserve(outerListRef.current as HTMLElement);
            }
        };
    }, []);

    return [
        scrolbarWidth
    ]
}
