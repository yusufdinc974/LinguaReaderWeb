import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer style={{
            padding: '2rem 0',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            borderTop: '1px solid var(--border)',
            marginTop: '4rem'
        }}>
            <div className="container">
                <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            </div>
        </footer>
    );
}
