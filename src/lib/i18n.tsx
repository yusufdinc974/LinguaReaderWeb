import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en, type Copy } from './en';
import { tr } from './tr';

export type Lang = 'en' | 'tr';
const copies: Record<Lang, Copy> = { en, tr };
const KEY = 'lr-lang';

function initialLang(): Lang {
    try {
        const saved = localStorage.getItem(KEY);
        if (saved === 'en' || saved === 'tr') return saved;
    } catch { /* storage unavailable */ }
    return navigator.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

interface Ctx { lang: Lang; t: Copy; setLang: (l: Lang) => void }
const I18nContext = createContext<Ctx>({ lang: 'en', t: en, setLang: () => { } });

export function I18nProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(initialLang);
    useEffect(() => { document.documentElement.lang = lang; }, [lang]);
    const value = useMemo<Ctx>(() => ({
        lang,
        t: copies[lang],
        setLang: l => {
            setLangState(l);
            try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
        },
    }), [lang]);
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = () => useContext(I18nContext);

/** Replace {name} placeholders. */
// eslint-disable-next-line react-refresh/only-export-components
export function fill(text: string, values: Record<string, string | number>): string {
    return text.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ''));
}
