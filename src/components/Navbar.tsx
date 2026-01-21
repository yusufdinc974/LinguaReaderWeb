import { Link, useLocation, useNavigate } from 'react-router-dom';
import { appRoutes } from '../app-routes';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleDownloadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollToDownload: true } });
        } else {
            const element = document.getElementById('download');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
                    Lingua<span className="text-accent">Reader</span>
                </Link>

                {/* Desktop Nav */}
                <div className="nav-links desktop">
                    {appRoutes.filter(r => r.showInNav).map((route) => (
                        <Link
                            key={route.path}
                            to={route.path}
                            className={`nav-link ${location.pathname === route.path ? 'active' : ''}`}
                            onClick={() => {
                                if (route.path === '/') window.scrollTo(0, 0);
                            }}
                        >
                            {t(route.name)}
                        </Link>
                    ))}

                    <button onClick={toggleLanguage} className="lang-toggle" aria-label="Switch Language">
                        <Globe size={20} />
                        <span>{i18n.language.toUpperCase()}</span>
                    </button>

                    <a href="#download" onClick={handleDownloadClick} className="btn btn-primary btn-sm">{t('nav.download')}</a>
                </div>

                {/* Mobile Toggle */}
                <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="mobile-menu">
                        {appRoutes.filter(r => r.showInNav).map((route) => (
                            <Link
                                key={route.path}
                                to={route.path}
                                className="mobile-link"
                                onClick={() => setIsOpen(false)}
                            >
                                {t(route.name)}
                            </Link>
                        ))}

                        <button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="mobile-link" style={{ justifyContent: 'flex-start', width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Globe size={16} />
                            Switch to {i18n.language === 'en' ? 'TR' : 'EN'}
                        </button>

                        <a href="#download" className="mobile-link highlight" onClick={(e) => { handleDownloadClick(e); setIsOpen(false); }}>{t('nav.download')}</a>
                    </div>
                )}
            </div>
        </nav>
    );
}
