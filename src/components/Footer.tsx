import { Link } from 'react-router-dom';
import Logo from './Logo';
import { fill, useI18n } from '../lib/i18n';
import { REPO } from '../lib/release';

export default function Footer() {
    const { t } = useI18n();
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div>
                    <Link to="/" className="brand">
                        <Logo size={28} />
                        <span>LinguaReader</span>
                    </Link>
                    <p className="muted footer-tag">{t.footer.tagline}</p>
                </div>
                <div>
                    <h3>{t.footer.product}</h3>
                    <Link to="/#features">{t.nav.features}</Link>
                    <Link to="/#download">{t.nav.download}</Link>
                    <Link to="/custom-lists">{t.nav.lists}</Link>
                    <Link to="/mobile">{t.footer.android}</Link>
                </div>
                <div>
                    <h3>{t.footer.project}</h3>
                    <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>
                    <a href={`${REPO}/releases`} target="_blank" rel="noreferrer">{t.footer.releases}</a>
                    <a href={`${REPO}/issues/new`} target="_blank" rel="noreferrer">{t.footer.issues}</a>
                    <Link to="/contribution">{t.nav.contribute}</Link>
                </div>
                <div>
                    <h3>{t.footer.legal}</h3>
                    <Link to="/privacy">{t.footer.privacy}</Link>
                    <Link to="/delete-account">{t.footer.deleteAccount}</Link>
                </div>
            </div>
            <div className="container footer-bottom faint">
                {fill(t.footer.copyright, { year: new Date().getFullYear() })}
            </div>
        </footer>
    );
}
