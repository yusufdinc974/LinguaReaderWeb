import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
            <Navbar />
            <main style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
