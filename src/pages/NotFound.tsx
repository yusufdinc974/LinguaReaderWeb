import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';

export default function NotFound() {
    const { t } = useI18n();
    return (
        <div className="page container narrow">
            <header className="page-head">
                <h1>{t.notFound.title}</h1>
                <p className="lead">{t.notFound.body}</p>
            </header>
            <p><Link to="/" className="btn btn-primary">{t.notFound.home}</Link></p>
        </div>
    );
}
