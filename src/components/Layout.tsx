import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

/** Scroll to the section named in the URL, or to the top on a new page. */
function useScrollToTarget() {
    const { pathname, hash, key } = useLocation();
    const lastPath = useRef<string | null>(null);
    useEffect(() => {
        // Glide within a page; jump when the page itself changed.
        const samePage = lastPath.current === pathname;
        lastPath.current = pathname;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const behavior: ScrollBehavior = samePage && !reduce ? 'smooth' : 'instant';
        if (hash) {
            const el = document.getElementById(hash.slice(1));
            if (el) {
                el.scrollIntoView({ behavior });
                return;
            }
        }
        window.scrollTo({ top: 0, behavior });
    }, [pathname, hash, key]);
}

export default function Layout() {
    useScrollToTarget();
    return (
        <>
            <a href="#main" className="skip">Skip to content</a>
            <Nav />
            <main id="main">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
