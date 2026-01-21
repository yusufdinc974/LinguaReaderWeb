import { BookOpen, Languages, Brain, Palette, Sparkles, BarChart3, Moon, RefreshCw, Upload, Download, FileJson } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Features.css';

// ... Demos remain unchanged as they are visual/code mainly ...
// However, hardcoded text inside demos should ideally be translated too if they are user-facing strings
// For now, I will translate the main feature descriptions which is the core request.
// The demo strings are part of the 'simulation' and might be acceptable in English/French as examples.

function PDFReaderDemo() {
    return (
        <div className="feature-demo pdf-reader-demo">
            <div className="demo-window">
                <div className="window-header">
                    <div className="window-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <span className="window-title">document.pdf</span>
                </div>
                <div className="pdf-content">
                    <motion.div
                        className="pdf-line"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <motion.div
                        className="pdf-line short"
                        initial={{ width: 0 }}
                        whileInView={{ width: '75%' }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    />
                    <motion.div
                        className="pdf-line"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    />
                    <motion.div
                        className="pdf-line medium"
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                    />
                    <motion.div
                        className="pdf-progress"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                    >
                        <span>Page 42 / 156</span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function TranslationDemo() {
    return (
        <div className="feature-demo translation-demo">
            <div className="sentence-container">
                <p className="original-sentence">
                    Le petit <motion.span
                        className="highlighted-word"
                        whileHover={{ scale: 1.1 }}
                        initial={{ backgroundColor: 'transparent' }}
                        whileInView={{ backgroundColor: 'rgba(56, 189, 248, 0.3)' }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >prince</motion.span> habitait une planète.
                </p>
                <motion.div
                    className="translation-popup"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                >
                    <div className="popup-arrow"></div>
                    <div className="popup-content">
                        <span className="word-header">prince</span>
                        <span className="word-type">noun, masculine</span>
                        <span className="word-translation">prince, royal heir</span>
                    </div>
                </motion.div>
            </div>
            <motion.div
                className="context-translation"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <Sparkles size={14} />
                <span>"The little prince lived on a planet."</span>
            </motion.div>
        </div>
    );
}

function FlashcardDemo() {
    return (
        <div className="feature-demo flashcard-demo">
            <motion.div
                className="flashcard-stack"
                initial={{ rotateY: 0 }}
                whileInView={{ rotateY: [0, 180, 0] }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            >
                <div className="flashcard front">
                    <span className="card-word">époustouflant</span>
                    <span className="card-hint">tap to reveal</span>
                </div>
                <div className="flashcard back">
                    <span className="card-translation">breathtaking / stunning</span>
                </div>
            </motion.div>
            <div className="srs-indicators">
                <motion.div
                    className="srs-bar"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <div className="srs-progress" style={{ width: '72%' }}></div>
                </motion.div>
                <span className="srs-label">Mastery: 72%</span>
            </div>
        </div>
    );
}

function ThemingDemo() {
    return (
        <div className="feature-demo theming-demo">
            <div className="theme-preview">
                <motion.div
                    className="theme-card dark"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Moon size={18} />
                    <span>Dark Mode</span>
                </motion.div>
                <motion.div
                    className="theme-card light"
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Sparkles size={18} />
                    <span>Light Mode</span>
                </motion.div>
            </div>
            <motion.div
                className="stats-preview"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <BarChart3 size={20} />
                <div className="mini-bars">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <motion.div
                            key={i}
                            className="mini-bar"
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                        />
                    ))}
                </div>
                <span className="stats-label">Weekly Progress</span>
            </motion.div>
        </div>
    );
}

function ImportExportDemo() {
    return (
        <div className="feature-demo import-demo">
            <motion.div
                className="data-transfer-container"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="device-icon">
                    <FileJson size={32} />
                    <span>JSON</span>
                </div>

                <div className="transfer-path">
                    <motion.div
                        className="transfer-dot"
                        animate={{
                            x: [-20, 80],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="transfer-dot"
                        animate={{
                            x: [80, -20],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.75
                        }}
                    />
                </div>

                <div className="device-icon app">
                    <RefreshCw size={32} />
                    <span>App</span>
                </div>
            </motion.div>

            <div className="action-buttons">
                <motion.div
                    className="action-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Upload size={16} />
                    Import
                </motion.div>
                <motion.div
                    className="action-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Download size={16} />
                    Export
                </motion.div>
            </div>
        </div>
    );
}

export default function Features() {
    const { t } = useTranslation();

    const features = [
        {
            icon: BookOpen,
            title: t('features.pdf_reader.title'),
            description: t('features.pdf_reader.desc'),
            Demo: PDFReaderDemo
        },
        {
            icon: Languages,
            title: t('features.translation.title'),
            description: t('features.translation.desc'),
            Demo: TranslationDemo
        },
        {
            icon: Brain,
            title: t('features.srs.title'),
            description: t('features.srs.desc'),
            Demo: FlashcardDemo
        },
        {
            icon: Palette,
            title: t('features.customizable.title'),
            description: t('features.customizable.desc'),
            Demo: ThemingDemo
        },
        {
            icon: FileJson,
            title: t('features.import_export.title'),
            description: t('features.import_export.desc'),
            Demo: ImportExportDemo
        }
    ];

    return (
        <section id="features" className="features-section">
            <div className="container">
                <div className="features-header">
                    <h2>{t('features.title')}</h2>
                    <p>{t('features.subtitle')}</p>
                </div>

                <div className="features-list">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`feature-row ${index % 2 === 1 ? 'reverse' : ''}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="feature-content">
                                <div className="feature-icon-wrapper">
                                    <feature.icon size={28} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                            <div className="feature-demo-wrapper">
                                <feature.Demo />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
