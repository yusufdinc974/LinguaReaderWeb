import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Check, ChevronLeft, ChevronRight, Languages, Layers, Library, Minus, Plus, Settings, Volume2, X } from 'lucide-react';
import Logo from './Logo';
import { fill, useI18n, type Lang } from '../lib/i18n';

const TEXT = [
    'Ce matin-là, une épaisse brume couvrait encore le quai lorsque Marthe ouvrit la fenêtre de sa chambre. Les bateaux de pêche dormaient côte à côte, et l\'on n\'entendait que le cri lointain des mouettes.',
    'Elle descendit la ruelle qui menait au port. Au coin de la place, la boulangerie était déjà ouverte, et l\'odeur du pain chaud se mêlait à celle du sel et des algues.',
];

/** word -> [English, Turkish] */
const GLOSSARY: Record<string, [string, string]> = {
    'ce': ['this, that', 'bu, o'],
    'matin-là': ['that morning', 'o sabah'],
    'une': ['a, an', 'bir'],
    'épaisse': ['thick', 'yoğun, kalın'],
    'brume': ['mist, haze', 'sis, pus'],
    'couvrait': ['was covering', 'kaplıyordu'],
    'encore': ['still', 'hâlâ'],
    'le': ['the', 'belirli tanımlık (eril)'],
    'quai': ['quay, platform', 'rıhtım'],
    'lorsque': ['when', 'iken, -dığı zaman'],
    'marthe': ['Marthe (a name)', 'Marthe (özel isim)'],
    'ouvrit': ['opened', 'açtı'],
    'la': ['the', 'belirli tanımlık (dişil)'],
    'fenêtre': ['window', 'pencere'],
    'de': ['of, from', '-in, -den'],
    'sa': ['her, his', 'onun'],
    'chambre': ['bedroom, room', 'oda, yatak odası'],
    'les': ['the', 'belirli tanımlık (çoğul)'],
    'bateaux': ['boats', 'tekneler'],
    'pêche': ['fishing', 'balıkçılık'],
    'dormaient': ['were sleeping', 'uyuyorlardı'],
    'côte': ['side', 'yan'],
    'à': ['to, at', '-e, -de'],
    'et': ['and', 've'],
    "l'on": ['one, people', 'insan, kişi'],
    "n'entendait": ['heard (nothing but)', 'duymuyordu'],
    'que': ['only, but', 'yalnızca'],
    'cri': ['cry, call', 'çığlık'],
    'lointain': ['distant', 'uzak'],
    'des': ['of the, some', '-lerin, bazı'],
    'mouettes': ['seagulls', 'martılar'],
    'elle': ['she', 'o (kadın)'],
    'descendit': ['went down', 'indi'],
    'ruelle': ['alley, lane', 'ara sokak'],
    'qui': ['which, that', 'ki, olan'],
    'menait': ['led', 'götürüyordu'],
    'au': ['to the, at the', '-e, -de'],
    'port': ['harbour, port', 'liman'],
    'coin': ['corner', 'köşe'],
    'place': ['square', 'meydan'],
    'boulangerie': ['bakery', 'fırın'],
    'était': ['was', 'idi'],
    'déjà': ['already', 'çoktan, zaten'],
    'ouverte': ['open', 'açık'],
    "l'odeur": ['the smell', 'koku'],
    'du': ['of the', '-in'],
    'pain': ['bread', 'ekmek'],
    'chaud': ['warm, hot', 'sıcak'],
    'se': ['itself', 'kendini'],
    'mêlait': ['was mixing', 'karışıyordu'],
    'celle': ['that, the one', 'onunki'],
    'sel': ['salt', 'tuz'],
    'algues': ['seaweed', 'yosunlar'],
};

const LEVEL_COLORS = ['#c4513f', '#d99a4e', '#d4b24a', '#6fae6a', '#5b8fc7'];

interface Token { text: string; key?: string }

function tokenize(paragraph: string): Token[] {
    return paragraph.split(/(\s+|[.,])/).filter(Boolean).map(text => {
        const key = text.toLowerCase();
        return key in GLOSSARY ? { text, key } : { text };
    });
}

function translation(key: string, lang: Lang) {
    return GLOSSARY[key][lang === 'tr' ? 1 : 0];
}

function speak(word: string) {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'fr-FR';
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}

interface Selection { key: string; text: string; id: string }

/** A small working copy of the desktop reader: click a word, see it, rate it, save it. */
export default function ReaderDemo() {
    const { t, lang } = useI18n();
    const paragraphs = useMemo(() => TEXT.map(tokenize), []);
    const [saved, setSaved] = useState<Record<string, number>>({ brume: 0, quai: 1 });
    const [selected, setSelected] = useState<Selection | null>(() => {
        const i = paragraphs[0].findIndex(tok => tok.key === 'fenêtre');
        return i < 0 ? null : { key: 'fenêtre', text: 'fenêtre', id: `0-${i}` };
    });
    const [level, setLevel] = useState(0);
    const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

    // Place the card under the selected word (above it when there is no room), inside the stage.
    useLayoutEffect(() => {
        const place = () => {
            const stage = stageRef.current, card = cardRef.current;
            if (!selected || !stage || !card) return;
            const word = stage.querySelector<HTMLElement>(`[data-id="${selected.id}"]`);
            if (!word) return;
            const s = stage.getBoundingClientRect(), w = word.getBoundingClientRect();
            const margin = 12;
            const left = Math.max(margin, Math.min(w.left - s.left - 16, s.width - card.offsetWidth - margin));
            let top = w.bottom - s.top + 8;
            if (top + card.offsetHeight > s.height - margin) {
                top = Math.max(margin, w.top - s.top - card.offsetHeight - 8);
            }
            setPos({ left, top });
        };
        place();
        window.addEventListener('resize', place);
        return () => window.removeEventListener('resize', place);
    }, [selected, lang]);

    const select = (tok: Token, id: string) => {
        if (!tok.key) return;
        setPos(null);
        setSelected({ key: tok.key, text: tok.text, id });
        setLevel(saved[tok.key] ?? 0);
    };

    const isSaved = selected ? selected.key in saved : false;
    const save = () => selected && setSaved(s => ({ ...s, [selected.key]: level }));
    const remove = () => selected && setSaved(s => {
        const next = { ...s };
        delete next[selected.key];
        return next;
    });
    const pickLevel = (i: number) => {
        setLevel(i);
        if (selected && selected.key in saved) setSaved(s => ({ ...s, [selected.key]: i }));
    };

    const count = Object.keys(saved).length;

    return (
        <div className="demo">
            <div className="demo-window" aria-label="LinguaReader">
                <div className="demo-side" aria-hidden="true">
                    <Logo size={30} />
                    <span className="demo-side-btn"><Library size={18} /></span>
                    <span className="demo-side-btn on"><BookOpen size={18} /></span>
                    <span className="demo-side-btn">
                        <Layers size={18} />
                        {count > 0 && <i className="demo-dot" />}
                    </span>
                    <span className="demo-side-btn last"><Settings size={18} /></span>
                </div>
                <div className="demo-main">
                    <div className="demo-bar" aria-hidden="true">
                        <span className="demo-title">{t.demo.title}</span>
                        <span className="demo-tools">
                            <ChevronLeft size={16} className="faint" />
                            <span className="demo-page">1</span>
                            <span className="faint">/ 2</span>
                            <ChevronRight size={16} />
                            <span className="demo-sep hide-sm" />
                            <Minus size={16} className="hide-sm" />
                            <span className="hide-sm">140%</span>
                            <Plus size={16} className="hide-sm" />
                            <span className="demo-sep" />
                            <Languages size={16} />
                            <span>{t.demo.target}</span>
                        </span>
                    </div>
                    <div
                        className="demo-stage"
                        ref={stageRef}
                        onClick={e => {
                            // A click on the page that isn't on a word or the card closes the card, like in the app.
                            const el = e.target as HTMLElement;
                            if (!el.closest('.w') && !el.closest('.word-card')) setSelected(null);
                        }}
                    >
                        <article className="demo-page-sheet" lang="fr">
                            <h3>Le Port dans la <mark className={'brume' in saved ? 'hl' : undefined}>brume</mark></h3>
                            <p className="demo-chapter">Chapitre premier</p>
                            {paragraphs.map((tokens, p) => (
                                <p key={p}>
                                    {tokens.map((tok, i) => {
                                        const id = `${p}-${i}`;
                                        if (!tok.key) return tok.text;
                                        const cls = [
                                            'w',
                                            tok.key in saved ? 'hl' : '',
                                            selected?.id === id ? 'sel' : '',
                                        ].filter(Boolean).join(' ');
                                        return (
                                            <span
                                                key={id}
                                                data-id={id}
                                                className={cls}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => select(tok, id)}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        select(tok, id);
                                                    }
                                                }}
                                            >
                                                {tok.text}
                                            </span>
                                        );
                                    })}
                                </p>
                            ))}
                        </article>

                        {selected && (
                            <div
                                className="word-card"
                                ref={cardRef}
                                style={pos ? { left: pos.left, top: pos.top } : { visibility: 'hidden' }}
                                role="dialog"
                                aria-label={selected.text}
                            >
                                <div className="word-card-head">
                                    <div>
                                        <div className="word-card-word">
                                            <span lang="fr">{selected.text}</span>
                                            {canSpeak && (
                                                <button className="icon-btn sm" onClick={() => speak(selected.text)} aria-label={t.demo.listen} title={t.demo.listen}>
                                                    <Volume2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="word-card-tr">{translation(selected.key, lang)}</div>
                                        <div className="word-card-via">{t.demo.sample}</div>
                                    </div>
                                    <button className="icon-btn sm" onClick={() => setSelected(null)} aria-label={t.demo.close}>
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="word-card-body">
                                    <div className="label">{t.demo.howWell}</div>
                                    <div className="levels">
                                        {t.demo.levels.map((name, i) => (
                                            <button key={name} className={level === i ? 'on' : undefined} aria-pressed={level === i} onClick={() => pickLevel(i)}>
                                                <i style={{ background: LEVEL_COLORS[i] }} />
                                                {name}
                                            </button>
                                        ))}
                                    </div>
                                    {isSaved ? (
                                        <div className="word-card-actions">
                                            <span className="saved-pill"><Check size={16} /> {t.demo.saved}</span>
                                            <button className="link-danger" onClick={remove}>{t.demo.remove}</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-primary btn-block" onClick={save}>
                                            <Plus size={16} /> {t.demo.save}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <p className="demo-hint">
                <span>{t.demo.hint}</span>
                <span className="faint" aria-live="polite">{fill(count === 1 ? t.demo.count_one : t.demo.count_other, { n: count })}</span>
            </p>
        </div>
    );
}
