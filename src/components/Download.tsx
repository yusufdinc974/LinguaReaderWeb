import { Github, Monitor, Apple, Command, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ReleaseAsset {
    name: string;
    browser_download_url: string;
}

interface ReleaseData {
    tag_name: string;
    assets: ReleaseAsset[];
}

export default function Download() {
    const [release, setRelease] = useState<ReleaseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        fetch('https://api.github.com/repos/yusufdinc974/LinguaReader/releases/latest')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                setRelease(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    const getAssetUrl = (extension: string) => {
        return release?.assets.find(asset => asset.name.endsWith(extension))?.browser_download_url;
    };

    const linuxUrl = getAssetUrl('.deb') || getAssetUrl('.AppImage') || 'https://github.com/yusufdinc974/LinguaReader/releases/latest';
    const winUrl = getAssetUrl('.exe') || 'https://github.com/yusufdinc974/LinguaReader/releases/latest';
    const macUrl = getAssetUrl('.dmg') || 'https://github.com/yusufdinc974/LinguaReader/releases/latest';

    const downloadOptions = [
        {
            os: 'Windows',
            icon: Monitor,
            url: winUrl,
            desc: t('download.windows'),
            fileType: '.exe'
        },
        {
            os: 'macOS',
            icon: Apple,
            url: macUrl,
            desc: t('download.macos'),
            fileType: '.dmg'
        },
        {
            os: 'Linux',
            icon: Command, // Using Command as a generic terminal/linux icon proxy
            url: linuxUrl,
            desc: t('download.linux'),
            fileType: '.deb'
        }
    ];

    return (
        <section id="download" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-accent)', textAlign: 'center' }}>
            <div className="container">
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('download.title')}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '3rem' }}>
                    {loading ? t('download.checking') : `${t('download.latest_release')}: ${release?.tag_name || 'v1.0.0'}`}
                </p>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <Loader2 className="animate-spin" size={48} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : error ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <AlertCircle color="var(--primary)" size={32} />
                        <p>{t('download.fetch_error')}</p>
                        <a
                            href="https://github.com/yusufdinc974/LinguaReader/releases/latest"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                        >
                            <Github size={20} />
                            {t('download.visit_github')}
                        </a>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {downloadOptions.map((opt) => (
                            <a
                                key={opt.os}
                                href={opt.url}
                                className="download-card"
                                style={{
                                    padding: '2rem',
                                    backgroundColor: 'var(--bg-primary)',
                                    borderRadius: '1rem',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                }}
                            >
                                <div style={{
                                    width: '4rem',
                                    height: '4rem',
                                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)'
                                }}>
                                    <opt.icon size={32} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{opt.os}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{opt.desc}</p>
                                </div>
                                <div className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                                    {t('download.download_btn')} {opt.fileType}
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                <div style={{ marginTop: '4rem' }}>
                    <a
                        href="https://github.com/yusufdinc974/LinguaReader"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', }}
                    >
                        <Github size={16} />
                        {t('download.view_source')}
                    </a>
                </div>
            </div>
        </section>
    );
}
