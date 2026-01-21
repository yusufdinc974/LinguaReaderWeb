import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                    >
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
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

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-image-wrapper"
                        style={{
                            position: 'relative',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            marginTop: '2rem',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                            border: '1px solid var(--border)'
                        }}
                    >
                        <div
                            className="glow-effect"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                zIndex: 1,
                                borderRadius: '1rem',
                                pointerEvents: 'none',
                                animation: 'glow-pulse 3s infinite ease-in-out'
                            }}
                        ></div>
                        <img
                            src="/assets/banner.png"
                            alt="LinguaReader Interface"
                            style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 0 }}
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
