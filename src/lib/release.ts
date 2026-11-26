import { useEffect, useState } from 'react';

export const REPO = 'https://github.com/yusufdinc974/LinguaReader';
const API = 'https://api.github.com/repos/yusufdinc974/LinguaReader/releases/latest';

export type FileKind = 'setup' | 'portable' | 'dmg' | 'appimage' | 'deb';
export type Platform = 'windows' | 'mac' | 'linux';

export interface ReleaseFile { kind: FileKind; name: string; url: string; size: number }
export interface Release { version: string; date: string | null; notesUrl: string; files: Record<FileKind, ReleaseFile> }

const kinds: Array<[FileKind, RegExp]> = [
    ['setup', /-Setup-.*\.exe$/i],
    ['portable', /-portable\.exe$/i],
    ['dmg', /\.dmg$/i],
    ['appimage', /\.AppImage$/i],
    ['deb', /\.deb$/i],
];

/** Shown until GitHub answers, and kept if it can't be reached. */
function fallback(): Release {
    const v = '1.3.0';
    const base = `${REPO}/releases/download/v${v}/`;
    const f = (kind: FileKind, name: string, size: number): ReleaseFile => ({ kind, name, url: base + name, size });
    return {
        version: v,
        date: '2026-11-26',
        notesUrl: `${REPO}/releases/tag/v${v}`,
        files: {
            setup: f('setup', `LinguaReader-Setup-${v}.exe`, 252635050),
            portable: f('portable', `LinguaReader-${v}-portable.exe`, 233594185),
            dmg: f('dmg', `LinguaReader-${v}-arm64.dmg`, 264020667),
            appimage: f('appimage', `LinguaReader-${v}.AppImage`, 292714260),
            deb: f('deb', `linguareader_${v}_amd64.deb`, 248915740),
        },
    };
}

interface ApiAsset { name: string; browser_download_url: string; size: number }
interface ApiRelease { tag_name: string; published_at: string; html_url: string; assets: ApiAsset[] }

let cached: Promise<Release | null> | null = null;

function load(): Promise<Release | null> {
    cached ??= fetch(API)
        .then(r => (r.ok ? r.json() : null))
        .then((data: ApiRelease | null) => {
            if (!data?.tag_name || !Array.isArray(data.assets)) return null;
            const files: Partial<Record<FileKind, ReleaseFile>> = {};
            for (const [kind, pattern] of kinds) {
                const a = data.assets.find(x => pattern.test(x.name));
                if (a) files[kind] = { kind, name: a.name, url: a.browser_download_url, size: a.size };
            }
            // Only trust a release that has every installer; otherwise keep the known-good links.
            if (kinds.some(([k]) => !files[k])) return null;
            return {
                version: data.tag_name.replace(/^v/, ''),
                date: data.published_at?.slice(0, 10) ?? null,
                notesUrl: data.html_url,
                files: files as Record<FileKind, ReleaseFile>,
            };
        })
        .catch(() => null);
    return cached;
}

export function useRelease(): Release {
    const [release, setRelease] = useState<Release>(fallback);
    useEffect(() => {
        let alive = true;
        load().then(r => { if (alive && r) setRelease(r); });
        return () => { alive = false; };
    }, []);
    return release;
}

export function detectPlatform(): Platform | null {
    const ua = navigator.userAgent;
    if (/Android|iPhone|iPad|iPod/i.test(ua)) return null;
    if (/Windows/i.test(ua)) return 'windows';
    if (/Macintosh|Mac OS X/i.test(ua)) return 'mac';
    if (/Linux|X11/i.test(ua)) return 'linux';
    return null;
}

export const primaryFile: Record<Platform, FileKind> = { windows: 'setup', mac: 'dmg', linux: 'appimage' };

export function formatSize(bytes: number): string {
    return `${Math.round(bytes / 1024 / 1024)} MB`;
}
