import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DeviceFrame } from './DeviceFrame';
import { DesktopHeroSimulation } from './AppSimulations';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div className="hero-grid">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ maxWidth: '600px', margin: '0 auto' }}
                    >
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '2rem',
                                background: 'rgba(56, 189, 248, 0.1)',
                                color: 'var(--primary)',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                border: '1px solid rgba(56, 189, 248, 0.2)'
                            }}>
                                {t('hero.open_source')}
                            </span>
                            <span style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '2rem',
                                background: 'rgba(34, 197, 94, 0.1)',
                                color: '#22c55e',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                {t('hero.free_forever')}
                            </span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
                            {t('hero.title_start')} <br />
                            <span className="text-gradient">{t('hero.title_end')}</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                            {t('hero.subtitle')}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="#download" className="btn btn-primary">
                                <Download size={20} />
                                {t('hero.download_btn')}
                            </a>
                            <a href="#features" className="btn btn-outline">
                                {t('hero.features_btn')}
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            perspective: '1000px',
                            width: '100%',
                            minWidth: 0, /* Prevent Grid Blowout on Mobile */
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        <DeviceFrame type="desktop" alt="LinguaReader Desktop Interface">
                            <DesktopHeroSimulation />
                        </DeviceFrame>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
