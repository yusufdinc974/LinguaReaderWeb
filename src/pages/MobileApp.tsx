import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export default function MobileApp() {
    const { t } = useI18n();
    return (
        <div className="page container narrow">
            <header className="page-head">
                <p className="kicker">{t.android.kicker}</p>
                <h1>{t.android.title}</h1>
                <p className="lead">{t.android.subtitle}</p>
            </header>
            <p><Link to="/#download" className="btn btn-primary">{t.android.cta} <ArrowRight size={16} /></Link></p>
        </div>
    );
}
