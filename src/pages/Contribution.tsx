import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, Heart, MessageSquare, GitPullRequest, GitBranch, GitMerge, Code2 } from 'lucide-react';

export default function Contribution() {
    const { t } = useTranslation();

    const steps = [
        {
            icon: GitMerge,
            title: t('contribution.tutorial.step1_title'),
            desc: t('contribution.tutorial.step1_desc'),
            color: '#a855f7'
        },
        {
            icon: GitBranch,
            title: t('contribution.tutorial.step2_title'),
            desc: t('contribution.tutorial.step2_desc'),
            color: '#3b82f6'
        },
        {
            icon: GitPullRequest,
            title: t('contribution.tutorial.step3_title'),
            desc: t('contribution.tutorial.step3_desc'),
            color: '#22c55e'
        }
    ];

    return (
        <div style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        borderRadius: '50%',
                        background: 'var(--bg-accent)',
                        marginBottom: '1.5rem'
                    }}>
                        <Heart size={48} className="text-accent" fill="currentColor" fillOpacity={0.2} />
                    </div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('contribution.title')}</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        {t('contribution.subtitle')}
                    </p>
                </motion.div>

                {/* Tutorial Section */}
                <div style={{ marginBottom: '6rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <Code2 />
                        {t('contribution.tutorial.title')}
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', position: 'relative' }}>
                        {/* Connecting Line (Desktop) */}
                        <div className="tutorial-line" style={{
                            position: 'absolute',
                            top: '2.5rem',
                            left: '15%',
                            right: '15%',
                            height: '2px',
                            background: 'var(--border)',
                            zIndex: 0,
                            display: 'none' // Hidden by default, could show on wide screens via CSS if needed, but grid simplifies it
                        }}></div>

                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                style={{
                                    background: 'var(--bg-secondary)',
                                    padding: '2rem',
                                    borderRadius: '1rem',
                                    border: '1px solid var(--border)',
                                    position: 'relative',
                                    zIndex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{
                                    width: '5rem',
                                    height: '5rem',
                                    background: `rgba(${parseInt(step.color.slice(1, 3), 16)}, ${parseInt(step.color.slice(3, 5), 16)}, ${parseInt(step.color.slice(5, 7), 16)}, 0.1)`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: step.color
                                }}>
                                    <step.icon size={32} />
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{step.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Feedback Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'linear-gradient(135deg, var(--bg-accent) 0%, var(--bg-primary) 100%)',
                        padding: '3rem',
                        borderRadius: '1.5rem',
                        border: '1px solid var(--border)',
                        textAlign: 'center',
                        marginBottom: '6rem'
                    }}
                >
                    <MessageSquare size={40} style={{ marginBottom: '1.5rem', color: 'var(--primary)' }} />
                    <h2 style={{ marginBottom: '1rem' }}>{t('contribution.feedback.title')}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
                        {t('contribution.feedback.desc')}
                    </p>
                    <a
                        href="https://github.com/yusufdinc974/LinguaReader/issues/new"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{ display: 'inline-flex' }}
                    >
                        <Github size={20} />
                        {t('contribution.feedback.btn')}
                    </a>
                </motion.div>

                {/* Thank You Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center' }}
                >
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>{t('contribution.thanks.title')}</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 1rem auto' }}>
                        {t('contribution.thanks.message')}
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {t('contribution.thanks.praise')} ❤️
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
