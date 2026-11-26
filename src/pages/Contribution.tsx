import { ArrowRight, Github } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { REPO } from '../lib/release';

export default function Contribution() {
    const { t } = useI18n();
    const c = t.contribute;
    return (
        <div className="page container narrow">
            <header className="page-head">
                <p className="kicker">{c.kicker}</p>
                <h1>{c.title}</h1>
                <p className="lead">{c.subtitle}</p>
            </header>

            <section>
                <h2>{c.stepsTitle}</h2>
                <ol className="steps">
                    {c.steps.map(s => (
                        <li key={s.title}>
                            <h3>{s.title}</h3>
                            <p className="muted">{s.body}</p>
                        </li>
                    ))}
                </ol>
                <div className="code">
                    <pre><code>{'git clone https://github.com/<your-username>/LinguaReader.git\ncd LinguaReader\nnpm install\nnpm run dev'}</code></pre>
                </div>
                <p>
                    <a href={`${REPO}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer" className="arrow-link">
                        {c.guide} <ArrowRight size={16} />
                    </a>
                </p>
            </section>

            <section className="callout">
                <h2>{c.feedbackTitle}</h2>
                <p className="muted">{c.feedbackBody}</p>
                <a href={`${REPO}/issues/new`} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <Github size={18} /> {c.feedbackBtn}
                </a>
            </section>

            <p className="muted thanks">{c.thanks}</p>
        </div>
    );
}
