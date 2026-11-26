import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Menu, Moon, Sun, X } from 'lucide-react';
import Logo from './Logo';
import { useI18n } from '../lib/i18n';
import { REPO } from '../lib/release';

type Theme = 'light' | 'dark';

function currentTheme(): Theme {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export default function Nav() {
    const { t, lang, setLang } = useI18n();
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>(currentTheme);

    const toggleTheme = () => {
        const next: Theme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('lr-theme', next); } catch { /* ignore */ }
        setTheme(next);
    };

    const links = [
        { to: '/#features', label: t.nav.features },
        { to: '/#whats-new', label: t.nav.whatsNew },
        { to: '/custom-lists', label: t.nav.lists },
        { to: '/contribution', label: t.nav.contribute },
    ];

    return (
        <header className="nav">
            <div className="container nav-inner">
                <Link to="/" className="brand" aria-label="LinguaReader">
                    <Logo size={30} />
                    <span>LinguaReader</span>
                </Link>

                <nav className={`nav-links${open ? ' open' : ''}`} aria-label="Main" onClick={() => setOpen(false)}>
                    {links.map(l => (
                        <Link key={l.to} to={l.to} className={pathname === l.to ? 'active' : undefined}>{l.label}</Link>
                    ))}
                </nav>

                <div className="nav-tools">
                    <div className="lang" role="group" aria-label={t.nav.language}>
                        {(['en', 'tr'] as const).map(l => (
                            <button key={l} className={lang === l ? 'on' : undefined} aria-pressed={lang === l} onClick={() => setLang(l)}>
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <button className="icon-btn" onClick={toggleTheme} aria-label={t.nav.theme} title={t.nav.theme}>
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <a className="icon-btn hide-sm" href={REPO} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                        <Github size={18} />
                    </a>
                    <Link to="/#download" className="btn btn-primary btn-sm hide-xs">{t.nav.download}</Link>
                    <button className="icon-btn menu-btn" onClick={() => setOpen(o => !o)} aria-label={t.nav.menu} aria-expanded={open}>
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
        </header>
    );
}
