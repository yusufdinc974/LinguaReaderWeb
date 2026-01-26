
import React, { useRef, useState, useEffect } from 'react';

// Helper component to scale content to fit parent container while maintaining aspect ratio
export const ScaleToFit = ({ children, width, height }: { children: React.ReactNode, width: number, height: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const parent = containerRef.current.parentElement;
                if (parent) {
                    const parentWidth = parent.clientWidth;
                    const parentHeight = parent.clientHeight;
                    // Calculate scale to fit CONTAIN
                    const scaleX = parentWidth / width;
                    const scaleY = parentHeight / height;
                    const newScale = Math.min(scaleX, scaleY); // fit contain
                    setScale(newScale);
                }
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current?.parentElement) {
            observer.observe(containerRef.current.parentElement);
        }

        window.addEventListener('resize', updateScale);
        updateScale();

        return () => {
            window.removeEventListener('resize', updateScale);
            observer.disconnect();
        };
    }, [width, height]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    width: width,
                    height: height,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    flexShrink: 0,
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'subpixel-antialiased'
                }}
            >
                {children}
            </div>
        </div>
    );
};
