import React from 'react';
import { motion } from 'framer-motion';
import './DeviceFrame.css';

interface DeviceFrameProps {
    type: 'mobile' | 'desktop';
    src?: string; // Image or Video source URL
    children?: React.ReactNode; // Or pass custom content directly
    alt?: string;
    className?: string; // Allow extra styling positioning
    video?: boolean; // Is source a video?
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
    type,
    src,
    children,
    alt = "App Screenshot",
    className = "",
    video = false
}) => {

    const isMobile = type === 'mobile';

    // Animation variants
    const variants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8
            }
        }
    };

    return (
        <motion.div
            className={`device-frame-container ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
        >
            <div className={isMobile ? "device-frame-mobile" : "device-frame-desktop"}>
                {/* Reflection Glare */}
                <div className="device-glare" />

                <div className={isMobile ? "device-content-mobile" : "device-content-desktop"}>
                    {children || (
                        src && (
                            video ? (
                                <video
                                    src={src}
                                    className="device-media"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={src}
                                    alt={alt}
                                    className="device-media"
                                />
                            )
                        )
                    )}
                </div>

                {!isMobile && (
                    <div className="device-stand-desktop" />
                )}
            </div>
        </motion.div>
    );
};
