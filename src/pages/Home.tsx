import { Link } from 'react-router-dom';
import { ArrowRight, Check, Download as DownloadIcon, Github } from 'lucide-react';
import ReaderDemo from '../components/ReaderDemo';
import Download from '../components/Download';
import Shot from '../components/Shot';
import { fill, useI18n } from '../lib/i18n';
import { REPO, detectPlatform, primaryFile, useRelease } from '../lib/release';

const rowShots: Array<{ src: string; dark?: string }> = [
    { src: '/screens/reader.png' },
    { src: '/screens/ocr-manga.png' },
    { src: '/screens/review-setup.png' },
    { src: '/screens/words.png', dark: '/screens/words-dark.png' },
];

export default function Home() {
    const { t } = useI18n();
    const release = useRelease();
    const mine = detectPlatform();
    const osName = mine ? t.download[mine].name : null;

    return (
        <>
            <section className="hero">
                <div className="container">
                    <p className="eyebrow">{t.hero.eyebrow}</p>
                    <h1>
                        {t.hero.titleBefore}<mark className="hl">{t.hero.titleMark}</mark>{t.hero.titleAfter}
                    </h1>
                    <p className="lead hero-sub">{t.hero.subtitle}</p>
                    <div className="hero-cta">
                        {mine && osName ? (
                            <a href={release.files[primaryFile[mine]].url} className="btn btn-primary btn-lg">
                                <DownloadIcon size={18} /> {fill(t.hero.downloadFor, { os: osName })}
                            </a>
                        ) : (
                            <Link to="/#download" className="btn btn-primary btn-lg">
                                <DownloadIcon size={18} /> {t.hero.download}
                            </Link>
                        )}
                        <Link to="/#download" className="btn btn-outline btn-lg">{t.hero.allDownloads}</Link>
                    </div>
                    <p className="faint hero-note">{fill(t.hero.note, { version: release.version })}</p>

                    <ReaderDemo />

                    <ul className="formats" aria-label="Formats">
                        {t.hero.formats.map(f => <li key={f}>{f}</li>)}
                    </ul>
                </div>
            </section>

            <section id="features" className="section">
                <div className="container">
                    <header className="section-head">
                        <p className="kicker">{t.features.kicker}</p>
                        <h2>{t.features.title}</h2>
                    </header>
                    <div className="rows">
                        {t.features.rows.map((row, i) => (
                            <div key={row.title} className={`row${i % 2 ? ' flip' : ''}`}>
                                <div className="row-text">
                                    <h3>{row.title}</h3>
                                    <p className="muted">{row.body}</p>
                                    <ul className="checks">
                                        {row.points.map(p => (
                                            <li key={p}><Check size={16} aria-hidden="true" /><span>{p}</span></li>
                                        ))}
                                    </ul>
                                </div>
                                <Shot {...rowShots[i]} alt={row.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="whats-new" className="section section-alt">
                <div className="container">
                    <header className="section-head">
                        <p className="kicker">{t.more.kicker}</p>
                        <h2>{t.more.title}</h2>
                    </header>
                    <div className="cards">
                        {t.more.items.map(item => (
                            <div key={item.title} className="card">
                                <h3>{item.title}</h3>
                                <p className="muted">{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="section-foot">
                        <a href={release.notesUrl} target="_blank" rel="noreferrer" className="arrow-link">
                            {t.more.notes} <ArrowRight size={16} />
                        </a>
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <header className="section-head">
                        <h2>{t.gallery.title}</h2>
                    </header>
                    <div className="gallery">
                        <figure className="wide">
                            <Shot src="/screens/library.png" dark="/screens/library-dark.png" alt={t.gallery.libraryAlt} />
                            <figcaption>{t.gallery.library}</figcaption>
                        </figure>
                        <figure>
                            <Shot src="/screens/ocr-scan.jpg" alt={t.gallery.scanAlt} />
                            <figcaption>{t.gallery.scan}</figcaption>
                        </figure>
                        <figure>
                            <Shot src="/screens/settings.png" alt={t.gallery.settingsAlt} />
                            <figcaption>{t.gallery.settings}</figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <Download />

            <section className="section">
                <div className="container oss">
                    <h2>{t.oss.title}</h2>
                    <p className="lead">{t.oss.body}</p>
                    <div className="hero-cta center">
                        <a href={REPO} target="_blank" rel="noreferrer" className="btn btn-outline btn-lg"><Github size={18} /> {t.oss.github}</a>
                        <Link to="/contribution" className="btn btn-ghost btn-lg">{t.oss.contribute} <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </section>
        </>
    );
}
