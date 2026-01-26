import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Wifi, Zap, BookOpen, Download } from 'lucide-react';
import { DeviceFrame } from '../components/DeviceFrame';
import { MobileHeroSimulation } from '../components/AppSimulations';

export default function MobileApp() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the entire container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- Animation Mappings ---

    // Phone X Position: 
    // 0-15%: Center (Intro)
    // 15-20%: Move Right
    // 20-45%: STAY Right (Features)
    // 45-55%: Move Left
    // 55-80%: STAY Left (Download)
    const phoneX = useTransform(scrollYProgress,
        [0, 0.15, 0.2, 0.45, 0.55, 0.8],
        ["0%", "0%", "25%", "25%", "-25%", "-25%"]
    );

    // Initial Phone Y to avoid covering text: Start lower, move up
    const phoneY = useTransform(scrollYProgress, [0, 0.1], ["20%", "0%"]);

    // Phone Scale/Opacity usually stays consistent, but maybe subtle scale
    const phoneScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);

    // Section 1: Title (Visible at start, fades out quickly)
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

    // Section 2: Features (Appears on Left when phone is Right)
    // Visible from 20% to 45% (Hold)
    const featuresOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.45, 0.5], [0, 1, 1, 0]);

    // Section 3: Download (Appears on Right when phone is Left)
    // Visible from 55% to 80% (Hold)
    const downloadOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.8, 0.85], [0, 1, 1, 0]);

    return (
        <div ref={containerRef} style={{ height: '500vh', position: 'relative', background: 'var(--bg-primary)' }}>

            {/* Sticky Viewport */}
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* --- Background Elements (Optional) --- */}
                <div className="container" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    {/* 1. Title Section (Center) */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            textAlign: 'center',
                            opacity: titleOpacity,
                            scale: titleScale,
                            zIndex: 10,
                            top: '20%' /* Move text up a bit */
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
                            {[
                                { icon: Zap, key: 'touch_translate' },
                                { icon: Wifi, key: 'sync' },
                                { icon: BookOpen, key: 'offline' }
                            ].map((item) => (
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
                            marginTop: '10vh' /* Default offset to sit below text */
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
                    opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
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
