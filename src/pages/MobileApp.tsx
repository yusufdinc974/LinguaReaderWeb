import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Wifi, Zap, BookOpen, Download } from 'lucide-react';
import { DeviceFrame } from '../components/DeviceFrame';
import { MobileHeroSimulation } from '../components/AppSimulations';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function MobileApp() {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // --- Hook Logic (Always call hooks, conditionally apply them) ---
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const phoneX = useTransform(scrollYProgress,
        [0, 0.15, 0.2, 0.45, 0.55, 0.8],
        ["0%", "0%", "25%", "25%", "-25%", "-25%"]
    );
    const phoneY = useTransform(scrollYProgress, [0, 0.1], ["30%", "0%"]); /* Start lower */
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
    const featuresOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.45, 0.5], [0, 1, 1, 0]);
    const downloadOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.8, 0.85], [0, 1, 1, 0]);
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    // Data for mapping
    const featuresList = [
        { icon: Zap, key: 'touch_translate' },
        { icon: Wifi, key: 'sync' },
        { icon: BookOpen, key: 'offline' }
    ];

    if (!isDesktop) {
        // --- MOBILE LAYOUT (Static) ---
        return (
            <div style={{ padding: '8rem 1.5rem 4rem 1.5rem', background: 'var(--bg-primary)' }}>
                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.2 }}>
                        {t('mobile_page.title')}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        {t('mobile_page.subtitle')}
                    </p>
                </div>

                {/* Phone (Static Center) */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
                    <DeviceFrame type="mobile">
                        <MobileHeroSimulation />
                    </DeviceFrame>
                </div>

                {/* Features (Grid) */}
                <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '4rem' }}>
                    {featuresList.map((item) => (
                        <div key={item.key} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <div style={{ padding: 8, background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
                                    <item.icon size={20} />
                                </div>
                                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{t(`mobile_page.features.${item.key}.title`)}</h3>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                {t(`mobile_page.features.${item.key}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Download CTA */}
                <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>{t('mobile_page.hero_desc')}</h2>
                    <a
                        href="https://github.com/yusufdinc974/LinguaReaderAndroid/releases/latest/download/app-release.apk"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{ fontSize: '1.1rem', padding: '0.9rem 1.5rem', width: '100%', justifyContent: 'center' }}
                    >
                        <Download size={20} />
                        {t('mobile_page.download_android')}
                    </a>
                </div>
            </div>
        );
    }

    // --- DESKTOP LAYOUT (Animated Sticky) ---
    return (
        <div ref={containerRef} style={{ height: '500vh', position: 'relative', background: 'var(--bg-primary)' }}>

            {/* Sticky Viewport */}
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <div className="container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    {/* 1. Title Section */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            textAlign: 'center',
                            opacity: titleOpacity,
                            scale: titleScale,
                            zIndex: 10,
                            top: '12%' /* Move Title Up */
                        }}
                    >
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.2 }}>
                            {t('mobile_page.title')}
                        </h1>
                        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                            {t('mobile_page.subtitle')}
                        </p>
                    </motion.div>


                    {/* 2. Features Section (Left) */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            left: '5%',
                            width: '35%',
                            opacity: featuresOpacity,
                            x: -20
                        }}
                    >
                        <div style={{ display: 'grid', gap: '2rem' }}>
                            {featuresList.map((item) => (
                                <div key={item.key} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                        <div style={{ padding: 8, background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
                                            <item.icon size={20} />
                                        </div>
                                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{t(`mobile_page.features.${item.key}.title`)}</h3>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                        {t(`mobile_page.features.${item.key}.desc`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>


                    {/* 3. Download Section (Right) */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            right: '5%',
                            width: '35%',
                            textAlign: 'right',
                            opacity: downloadOpacity,
                            x: 20
                        }}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t('mobile_page.hero_desc')}</h2>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <a
                                href="https://github.com/yusufdinc974/LinguaReaderAndroid/releases/latest/download/app-release.apk"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary"
                                style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}
                            >
                                <Download size={24} />
                                {t('mobile_page.download_android')}
                            </a>
                        </div>
                    </motion.div>


                    {/* --- THE PHONE (Moving Actor) --- */}
                    <motion.div
                        style={{
                            x: phoneX,
                            y: phoneY,
                            zIndex: 20,
                            marginTop: '5vh',
                            width: '300px', /* Bigger phone */
                            maxWidth: '90vw'
                        }}
                    >
                        <DeviceFrame type="mobile">
                            <MobileHeroSimulation />
                        </DeviceFrame>
                    </motion.div>

                </div>
            </div>

            {/* Scroll Indicator Hint */}
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: 40,
                    left: '50%',
                    translateX: '-50%',
                    opacity: scrollIndicatorOpacity
                }}
            >
                <div style={{ width: 20, height: 40, border: '2px solid var(--text-secondary)', borderRadius: 12, position: 'relative' }}>
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ width: 4, height: 4, background: 'var(--text-primary)', borderRadius: '50%', position: 'absolute', top: 6, left: '50%', x: '-50%' }}
                    />
                </div>
            </motion.div>

        </div>
    );
}
