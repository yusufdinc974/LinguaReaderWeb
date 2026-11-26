import { Download as DownloadIcon, ExternalLink } from 'lucide-react';
import { fill, useI18n } from '../lib/i18n';
import { REPO, detectPlatform, formatSize, useRelease, type FileKind, type Platform } from '../lib/release';

const platforms: Array<{ id: Platform; files: FileKind[] }> = [
    { id: 'windows', files: ['setup', 'portable'] },
    { id: 'mac', files: ['dmg'] },
    { id: 'linux', files: ['appimage', 'deb'] },
];

export default function Download() {
    const { t, lang } = useI18n();
    const release = useRelease();
    const mine = detectPlatform();
    const d = t.download;

    const date = release.date
        ? new Date(`${release.date}T00:00:00`).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : null;

    return (
        <section id="download" className="section section-alt">
            <div className="container">
                <header className="section-head">
                    <p className="kicker">{d.kicker}</p>
                    <h2>{d.title}</h2>
                    <p className="lead">{d.subtitle}</p>
                    <p className="muted release-line">
                        <strong>{fill(d.version, { version: release.version })}</strong>
                        {date && <>, {fill(d.released, { date })}</>}
                    </p>
                </header>

                <div className="dl-grid">
                    {platforms.map(p => (
                        <div key={p.id} className={`dl-card${mine === p.id ? ' mine' : ''}`}>
                            <div className="dl-card-head">
                                <h3>{d[p.id].name}</h3>
                                {mine === p.id && <span className="tag">{d.yours}</span>}
                            </div>
                            <p className="muted dl-req">{d[p.id].req}</p>
                            <div className="dl-files">
                                {p.files.map((kind, i) => {
                                    const f = release.files[kind];
                                    return (
                                        <a key={kind} href={f.url} className={`btn ${i === 0 ? (mine === p.id ? 'btn-primary' : 'btn-outline') : 'btn-ghost'} btn-block dl-file`}>
                                            <DownloadIcon size={16} />
                                            <span className="dl-file-name">{d.files[kind]}</span>
                                            <span className="dl-size">{formatSize(f.size)}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="dl-links">
                    <a href={`${REPO}/releases`} target="_blank" rel="noreferrer">{d.allReleases} <ExternalLink size={14} /></a>
                    <a href={REPO} target="_blank" rel="noreferrer">{d.source} <ExternalLink size={14} /></a>
                </p>

                <div className="help">
                    <h3>{d.help.title}</h3>
                    <details open={mine === 'windows'}>
                        <summary>{d.help.windowsQ}</summary>
                        <p>{d.help.windowsA}</p>
                    </details>
                    <details open={mine === 'mac'}>
                        <summary>{d.help.macQ}</summary>
                        <p>{d.help.macA}</p>
                    </details>
                    <details open={mine === 'linux'}>
                        <summary>{d.help.linuxQ}</summary>
                        <p>{d.help.linuxA}</p>
                        <pre><code>{'chmod +x LinguaReader-*.AppImage\n./LinguaReader-*.AppImage'}</code></pre>
                    </details>
                </div>
            </div>
        </section>
    );
}
