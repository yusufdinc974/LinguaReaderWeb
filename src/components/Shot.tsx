interface Props {
    src: string;
    /** Shown instead of src when the site is in dark theme. */
    dark?: string;
    alt: string;
    width?: number;
    height?: number;
    eager?: boolean;
}

/** An app screenshot in a quiet window frame. */
export default function Shot({ src, dark, alt, width = 2800, height = 1800, eager }: Props) {
    const common = { alt, width, height, loading: eager ? 'eager' as const : 'lazy' as const, decoding: 'async' as const };
    return (
        <div className="shot">
            <img src={src} className={dark ? 'only-light' : undefined} {...common} />
            {dark && <img src={dark} className="only-dark" {...common} />}
        </div>
    );
}
