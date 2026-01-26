import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Wifi, Zap, BookOpen, Download } from 'lucide-react';

export default function MobileApp() {
    const { t } = useTranslation();

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
    };

    return (
        <div className="mobile-page">
            {/* Hero Section */}
            <section style={{
                padding: '8rem 2rem',
                background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.2 }}>
                            {t('mobile_page.title')}
                        </h1>
                        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            {t('mobile_page.subtitle')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        style={{ position: 'relative', display: 'inline-block' }}
                    >
                        {/* Abstract Phone Frame */}
                        <div style={{
                            width: '280px',
                            height: '560px',
                            background: 'var(--bg-primary)',
                            border: '8px solid var(--text-primary)',
                            borderRadius: '3rem',
                            position: 'relative',
                            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5)',
                            overflow: 'hidden',
                            margin: '0 auto'
                        }}>
                            {/* Screen Content Animation */}
                            <div style={{ padding: '2rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ height: '8px', width: '40%', background: 'var(--text-secondary)', opacity: 0.2, borderRadius: '4px' }}></div>
                                <div style={{ height: '8px', width: '80%', background: 'var(--text-secondary)', opacity: 0.2, borderRadius: '4px' }}></div>
                                <div style={{ height: '150px', background: 'var(--bg-accent)', borderRadius: '1rem', marginTop: '1rem' }}></div>
                                <motion.div
                                    className="translate-popup"
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5, type: 'spring' }}
                                    style={{
                                        marginTop: 'auto',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '1rem',
                                        borderRadius: '1rem',
                                        marginBottom: '2rem'
                                    }}
                                >
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Bonjour</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Hello</div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '6rem 2rem', background: 'var(--bg-primary)' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        {[
                            { icon: Zap, key: 'touch_translate' },
                            { icon: Wifi, key: 'sync' },
                            { icon: BookOpen, key: 'offline' }
                        ].map((item, i) => (
                            <motion.div
                                key={item.key}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={variants}
                                style={{
                                    padding: '2rem',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '1.5rem',
                                    border: '1px solid var(--border)',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{
                                    width: '4rem',
                                    height: '4rem',
                                    background: 'rgba(56, 189, 248, 0.1)',
                                    color: 'var(--primary)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem'
                                }}>
                                    <item.icon size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{t(`mobile_page.features.${item.key}.title`)}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{t(`mobile_page.features.${item.key}.desc`)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Download CTA */}
            <section style={{ padding: '6rem 2rem', background: 'var(--bg-accent)', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t('mobile_page.hero_desc')}</h2>
                    <a
                        href="https://github.com/yusufdinc974/LinguaReaderAndroid/releases/latest"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{ fontSize: '1.25rem', padding: '1rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                        <Download size={24} />
                        {t('mobile_page.download_android')}
                    </a>
                </div>
            </section>
        </div>
    );
}
