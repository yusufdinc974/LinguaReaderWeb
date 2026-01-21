import { motion } from 'framer-motion';
import { FileJson, Check, AlertCircle, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

// Example JSON content
const exampleJson = `{
  "listName": "My French Essentials",
  "listDescription": "Core vocabulary for beginners",
  "source_language": "fr",
  "target_language": "en",
  "words": [
    {
      "word": "bonjour",
      "translation": "hello"
    },
    {
      "word": "livre",
      "translation": "book",
      "context": "J'aime lire un livre."
    }
  ]
}`;

export default function CustomLists() {
    const [copied, setCopied] = useState(false);
    const { t } = useTranslation();

    const handleCopy = () => {
        navigator.clipboard.writeText(exampleJson);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        borderRadius: '1rem',
                        background: 'var(--bg-secondary)',
                        marginBottom: '1.5rem',
                        border: '1px solid var(--border)'
                    }}>
                        <FileJson size={48} color="var(--primary)" />
                    </div>
                    <h1 style={{ marginBottom: '1rem', fontSize: '3rem' }}>{t('custom_lists.title')}</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                        {t('custom_lists.subtitle')}
                    </p>
                </motion.div>

                {/* Visual Guide & Code */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

                    {/* Left Column: Explanations */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '1rem', border: '1px solid var(--border)' }}
                        >
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Check color="var(--primary)" />
                                {t('custom_lists.required_structure.title')}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                <Trans i18nKey="custom_lists.required_structure.desc">
                                    The root object defines metadata for your list. The <code style={{ color: 'var(--primary)' }}>words</code> array contains your vocabulary items.
                                </Trans>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '1rem', border: '1px solid var(--border)' }}
                        >
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <AlertCircle color="#eab308" />
                                {t('custom_lists.key_fields.title')}
                            </h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                <li><strong style={{ color: 'var(--text-primary)' }}>{t('custom_lists.key_fields.word')}</strong>: {t('custom_lists.key_fields.word_desc')}</li>
                                <li><strong style={{ color: 'var(--text-primary)' }}>{t('custom_lists.key_fields.translation')}</strong>: {t('custom_lists.key_fields.translation_desc')}</li>
                                <li><strong style={{ color: 'var(--text-primary)' }}>{t('custom_lists.key_fields.context')}</strong>: {t('custom_lists.key_fields.context_desc')}</li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right Column: Code Block */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            background: '#1e1e1e',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            overflow: 'hidden',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>my-list.json</span>
                                <button
                                    onClick={handleCopy}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.4rem 0.8rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '0.5rem',
                                        color: 'white',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    {copied ? <CheckCircle size={14} color="#4ade80" /> : <Copy size={14} />}
                                    {copied ? t('custom_lists.copied') : t('custom_lists.copy')}
                                </button>
                            </div>
                            <pre style={{
                                margin: 0,
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                lineHeight: '1.6',
                                color: '#d4d4d4',
                                overflowX: 'auto'
                            }}>
                                <code dangerouslySetInnerHTML={{
                                    __html: exampleJson
                                        .replace(/"(.*?)":/g, '<span style="color: #9cdcfe">"$1"</span>:')
                                        .replace(/: "(.*?)"/g, ': <span style="color: #ce9178">"$1"</span>')
                                }} />
                            </pre>
                        </div>

                        {/* Decoration Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                width: '60px',
                                height: '60px',
                                background: 'linear-gradient(135deg, var(--primary), #6366f1)',
                                borderRadius: '50%',
                                filter: 'blur(30px)',
                                zIndex: -1
                            }}
                        />
                    </motion.div>

                </div>

                {/* Steps */}
                <div style={{ marginTop: '6rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('custom_lists.steps.how_it_works')}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: t('custom_lists.steps.s1_title'), desc: t('custom_lists.steps.s1_desc') },
                            { title: t('custom_lists.steps.s2_title'), desc: t('custom_lists.steps.s2_desc') },
                            { title: t('custom_lists.steps.s3_title'), desc: t('custom_lists.steps.s3_desc') }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '1rem', border: '1px solid var(--border)' }}
                            >
                                <div style={{
                                    width: '3rem',
                                    height: '3rem',
                                    background: 'var(--bg-accent)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem auto',
                                    fontWeight: 'bold',
                                    color: 'var(--primary)'
                                }}>
                                    {i + 1}
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{step.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
