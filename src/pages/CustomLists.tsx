import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useI18n } from '../lib/i18n';

const example = `{
  "listName": "French essentials",
  "listDescription": "Core vocabulary for beginners",
  "words": [
    {
      "word": "bonjour",
      "translation": "hello",
      "source_language": "fr",
      "target_language": "en"
    },
    {
      "word": "livre",
      "translation": "book"
    }
  ]
}`;

export default function CustomLists() {
    const { t } = useI18n();
    const [copied, setCopied] = useState(false);
    const l = t.lists;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(example);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* clipboard unavailable */ }
    };

    return (
        <div className="page container narrow">
            <header className="page-head">
                <p className="kicker">{l.kicker}</p>
                <h1>{l.title}</h1>
                <p className="lead">{l.subtitle}</p>
            </header>

            <section>
                <h2>{l.formatTitle}</h2>
                <p className="muted">{l.formatBody}</p>
                <div className="code">
                    <div className="code-bar">
                        <span>my-list.json</span>
                        <button className="btn btn-ghost btn-sm" onClick={copy}>
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? l.copied : l.copy}
                        </button>
                    </div>
                    <pre><code>{example}</code></pre>
                </div>
            </section>

            <section>
                <h2>{l.fieldsTitle}</h2>
                <dl className="fields">
                    {l.fields.map(f => (
                        <div key={f.name}>
                            <dt>
                                <code>{f.name}</code>
                                <span className={f.req ? 'tag' : 'tag quiet'}>{f.req ? l.required : l.optional}</span>
                            </dt>
                            <dd className="muted">{f.desc}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section>
                <h2>{l.stepsTitle}</h2>
                <ol className="steps">
                    {l.steps.map(s => (
                        <li key={s.title}>
                            <h3>{s.title}</h3>
                            <p className="muted">{s.body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section>
                <h2>{l.otherTitle}</h2>
                <ul className="plain">
                    {l.other.map(o => <li key={o} className="muted">{o}</li>)}
                </ul>
            </section>
        </div>
    );
}
