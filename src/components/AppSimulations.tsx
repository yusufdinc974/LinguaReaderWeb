import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, BarChart2, Home, List, Brain, Settings, Save,
    ChevronRight, ToggleRight, Clock, Wifi, Battery, Signal
} from 'lucide-react';
import './AppSimulations.css';

// --- Assets ---

const Cursor = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 3.5L11.5 19.5L14.5 13.5L19.5 18.5L21.5 16.5L16.5 11.5L22.5 8.5L5.5 3.5Z" fill="#38BDF8" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

// --- Component: Desktop ---

export const DesktopHeroSimulation = () => {
    // ... [Previous Desktop Logic kept exactly the same] ...
    const [view, setView] = useState<'home' | 'reader' | 'lists' | 'quiz' | 'stats' | 'settings'>('home');

    useEffect(() => {
        const loop = () => {
            setView('home');
            setTimeout(() => setView('reader'), 3000);   // 3s
            setTimeout(() => setView('lists'), 9000);    // 9s
            setTimeout(() => setView('quiz'), 13000);    // 13s
            setTimeout(() => setView('stats'), 17000);   // 17s
            setTimeout(() => setView('settings'), 21000);// 21s
        };
        loop();
        const interval = setInterval(loop, 24000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="enchanted-container">
            {/* [Existing Desktop Render Logic] */}
            <motion.div
                className="magic-cursor"
                animate={{
                    x: [800, 120, 120, 450, 450, 560, 560, 120, 120, 600, 600, 120, 120, 500, 500, 120, 120, 600, 600, 120, 120, 500, 500, 120, 120],
                    y: [500, 146, 146, 155, 155, 230, 230, 198, 198, 300, 300, 250, 250, 450, 450, 302, 302, 300, 300, 354, 354, 150, 150, 94, 94],
                }}
                transition={{
                    duration: 24,
                    times: [0, 0.11, 0.125, 0.21, 0.25, 0.29, 0.33, 0.36, 0.375, 0.46, 0.50, 0.53, 0.54, 0.62, 0.65, 0.69, 0.708, 0.79, 0.83, 0.86, 0.875, 0.94, 0.96, 0.99, 1],
                    ease: "easeInOut",
                    repeat: Infinity
                }}
            >
                <Cursor />
                <motion.div className="cursor-click-ripple" animate={{ scale: [1, 2], opacity: [0.8, 0] }} transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 1 }} />
            </motion.div>

            <div className="enchanted-header">
                <div style={{ display: 'flex', gap: 6, marginRight: 'auto' }}>
                    <div className="control-dot red" style={{ background: '#ef4444', width: 10, height: 10, borderRadius: '50%' }} />
                    <div className="control-dot yellow" style={{ background: '#eab308', width: 10, height: 10, borderRadius: '50%' }} />
                    <div className="control-dot green" style={{ background: '#22c55e', width: 10, height: 10, borderRadius: '50%' }} />
                </div>
            </div>

            <div className="enchanted-body">
                <div className="glass-sidebar">
                    <SidebarItem icon={Home} label="Home" active={view === 'home'} />
                    <SidebarItem icon={BookOpen} label="PDF Reader" active={view === 'reader'} />
                    <SidebarItem icon={List} label="Word Lists" active={view === 'lists'} />
                    <SidebarItem icon={Brain} label="Quiz" active={view === 'quiz'} />
                    <SidebarItem icon={BarChart2} label="Stats" active={view === 'stats'} />
                    <SidebarItem icon={Settings} label="Settings" active={view === 'settings'} />
                </div>

                <div className="enchanted-viewport">
                    <AnimatePresence mode="wait">
                        {/* [Views...] Copying logic from previous step for completeness but ensuring structure matches */}
                        {view === 'home' && (
                            <motion.div key="home" className="view-home" {...pageAnim}>
                                <div className="home-welcome">
                                    <h2>Welcome back, Alex</h2>
                                    <p>12-day streak! Keep it up.</p>
                                    <div className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                                        <span style={{ fontSize: 13, color: '#94a3b8' }}>Recent</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 40, height: 50, background: '#3b82f6', borderRadius: 4 }}></div>
                                            <div><div style={{ fontWeight: 600 }}>Le Petit Prince</div></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="progress-ring-container">
                                    <Clock size={32} color="#3b82f6" style={{ marginBottom: 12 }} />
                                    <div style={{ fontSize: 24, fontWeight: 700 }}>24m</div>
                                </div>
                            </motion.div>
                        )}
                        {view === 'reader' && (
                            <motion.div key="reader" className="view-reader" {...pageAnim}>
                                <h1>Le Petit Prince</h1>
                                <p className="reader-text">
                                    On ne voyait pas le{' '}
                                    <motion.span className="interactive-word" animate={{ backgroundColor: ['rgba(56, 189, 248, 0)', 'rgba(56, 189, 248, 0.25)', 'rgba(56, 189, 248, 0.25)', 'rgba(56, 189, 248, 0)'] }} transition={{ duration: 24, times: [0.21, 0.25, 0.33, 0.35], repeat: Infinity }}>
                                        chapeau
                                        <motion.div className="glass-tooltip" initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }} transition={{ duration: 24, times: [0.25, 0.26, 0.33, 0.34], repeat: Infinity }}>
                                            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16, color: 'white' }}>chapeau</div>
                                            <div style={{ fontSize: 14, color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span>hat (noun)</span>
                                                <motion.div style={{ padding: '6px 12px', borderRadius: 6, fontWeight: 600, fontSize: 12, display: 'flex', gap: 6, alignItems: 'center' }} animate={{ backgroundColor: ['#3b82f6', '#22c55e'], color: ['white', 'white'] }} transition={{ duration: 24, times: [0.29, 0.30], repeat: Infinity }}>
                                                    <Save size={14} /><span>Save</span>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </motion.span>
                                    {' '}du métier. On voyait un serpent boa qui avalait un fauve.
                                    <br /><br />
                                    Les grandes personnes m'ont conseillé de laisser de côté les dessins de serpents boas, ouverts ou fermés, et de m'intéresser plutôt à la géographie, à l'histoire.
                                </p>
                            </motion.div>
                        )}
                        {view === 'lists' && (
                            <motion.div key="lists" className="view-lists" {...pageAnim}>
                                <h2>My Vocabulary</h2>
                                <div className="list-item"><div><div style={{ fontWeight: 600, color: '#38bdf8' }}>chapeau</div><div style={{ fontSize: 13, opacity: 0.7 }}>hat • Le Petit Prince</div></div><ChevronRight size={16} /></div>
                                <div className="list-item"><div><div style={{ fontWeight: 600 }}>époustouflant</div><div style={{ fontSize: 13, opacity: 0.7 }}>breathtaking • Article</div></div><ChevronRight size={16} /></div>
                            </motion.div>
                        )}
                        {view === 'quiz' && (
                            <motion.div key="quiz" className="view-quiz" {...pageAnim}>
                                <div className="quiz-card"><span style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>French • Noun</span><h2 style={{ fontSize: 32, marginBottom: 8 }}>livre</h2></div>
                                <div className="quiz-option"><div className="option-btn">Door</div><div className="option-btn" style={{ background: '#3b82f6', color: 'white' }}>Book</div><div className="option-btn">River</div><div className="option-btn">Car</div></div>
                            </motion.div>
                        )}
                        {view === 'stats' && (
                            <motion.div key="stats" className="view-stats" {...pageAnim}>
                                <div className="stat-card" style={{ gridColumn: 'span 2' }}>
                                    <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>Weekly Activity</span>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', height: 120, gap: 16 }}>
                                        {[40, 60, 35, 80, 55, 90, 75].map((h, i) => (
                                            <motion.div key={i} style={{ flex: 1, background: '#3b82f6', borderRadius: 6, opacity: 0.8 }} animate={{ height: [0, `${h}%`] }} transition={{ duration: 0.6, delay: i * 0.1 }} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {view === 'settings' && (
                            <motion.div key="settings" className="view-settings" {...pageAnim}>
                                <h2>Settings</h2>
                                <div className="setting-row"><span>Dark Mode</span><ToggleRight size={24} color="#3b82f6" /></div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// --- Component: Mobile ---

export const MobileHeroSimulation = () => {
    const [view, setView] = useState<'home' | 'reader' | 'stats'>('home');

    // Total Loop: 12 Seconds
    // 0-3s: Home (Tap 'Continuer')
    // 3-9s: Reader (Select word -> Sheet)
    // 9-12s: Stats

    useEffect(() => {
        const loop = () => {
            setView('home');
            setTimeout(() => setView('reader'), 3000);
            setTimeout(() => setView('stats'), 9000);
        };
        loop();
        const interval = setInterval(loop, 12000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="enchanted-container" style={{ background: '#020617' }}>
            {/* Mobile Touch Ripple Simulation */}
            <motion.div
                className="touch-ripple"
                animate={{
                    opacity: [0, 1, 0, 0],
                    scale: [0.5, 1.2, 1.2, 0.5],
                    x: [180, 180, 250, 250, 180], // Home Card -> Word location -> Nav Stats
                    y: [300, 300, 200, 200, 500]
                }}
                transition={{
                    duration: 12,
                    times: [0.2, 0.25, 0.3, 1], // Just simplified logic for now
                    repeat: Infinity
                }}
            />

            {/* Status Bar */}
            <div className="mobile-status-bar">
                <span>9:41</span>
                <div style={{ display: 'flex', gap: 6 }}>
                    <Signal size={14} />
                    <Wifi size={14} />
                    <Battery size={14} />
                </div>
            </div>

            {/* Viewport */}
            <div className="mobile-viewport">
                <AnimatePresence mode="wait">
                    {view === 'home' && (
                        <motion.div key="home" {...mobilePageAnim} style={{ padding: 12 }}>
                            <div className="stat-card" style={{ marginBottom: 16, background: '#1e293b' }}>
                                <span style={{ fontSize: 12, opacity: 0.7 }}>Daily Streak</span>
                                <div style={{ fontSize: 24, fontWeight: 'bold' }}>12 🔥</div>
                            </div>
                            <h3 style={{ marginBottom: 16 }}>Continue Reading</h3>
                            <div style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
                                <div style={{ minWidth: 100, height: 140, background: '#3b82f6', borderRadius: 8 }}></div>
                                <div style={{ minWidth: 100, height: 140, background: '#334155', borderRadius: 8 }}></div>
                            </div>
                        </motion.div>
                    )}
                    {view === 'reader' && (
                        <motion.div key="reader" {...mobilePageAnim}>
                            <h2 style={{ fontSize: 18, marginBottom: 16 }}>Le Petit Prince</h2>
                            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#cbd5e1' }}>
                                On ne voyait pas le <span style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)' }}>chapeau</span>.
                                Il représentait un serpent boa qui digérait un éléphant.
                            </p>
                            <motion.div
                                className="mobile-bottom-sheet"
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ delay: 0.5 }}
                            >
                                <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 4 }}>chapeau</div>
                                <div style={{ opacity: 0.7, marginBottom: 16 }}>hat • noun</div>
                                <div className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>Save to List</div>
                            </motion.div>
                        </motion.div>
                    )}
                    {view === 'stats' && (
                        <motion.div key="stats" {...mobilePageAnim} style={{ padding: 12 }}>
                            <h2 style={{ fontSize: 20, marginBottom: 16 }}>Statistics</h2>
                            <div className="stat-card" style={{ height: 160, background: '#1e293b', marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Weekly Activity</span>
                                    <span style={{ fontSize: 11, color: '#94a3b8' }}>Avg: 45m</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', height: 100, gap: 8 }}>
                                    {[30, 50, 40, 70, 60, 90, 50].map((h, i) => (
                                        <div key={i} style={{ flex: 1, background: i === 5 ? '#3b82f6' : 'rgba(59, 130, 246, 0.1)', borderRadius: 4, height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>

                            <div className="stat-card" style={{ background: '#1e293b', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                                        <span style={{ fontSize: 13, color: '#e2e8f0' }}>Accuracy</span>
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 'bold', color: '#22c55e' }}>87%</span>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontSize: 12, color: '#94a3b8' }}>Reading</span>
                                        <span style={{ fontSize: 12, color: '#e2e8f0' }}>Lv. 4</span>
                                    </div>
                                    <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                                        <div style={{ width: '75%', height: '100%', background: '#a855f7', borderRadius: 3 }} />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontSize: 12, color: '#94a3b8' }}>Listening</span>
                                        <span style={{ fontSize: 12, color: '#e2e8f0' }}>Lv. 2</span>
                                    </div>
                                    <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                                        <div style={{ width: '45%', height: '100%', background: '#eab308', borderRadius: 3 }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Nav */}
            <div className="mobile-nav-bar">
                <MobileNavItem icon={Home} label="Home" active={view === 'home'} />
                <MobileNavItem icon={BookOpen} label="Read" active={view === 'reader'} />
                <MobileNavItem icon={BarChart2} label="Stats" active={view === 'stats'} />
                <MobileNavItem icon={Settings} label="Settings" active={false} />
            </div>
        </div>
    );
}

// --- Helpers ---

const pageAnim = {
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 1.02 },
    transition: { duration: 0.4 }
};

const mobilePageAnim = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 }
}

const SidebarItem = ({ icon: Icon, label, active }: { icon: any, label: string, active: boolean }) => (
    <div className={`sidebar-item ${active ? 'active' : ''}`}>
        <Icon size={18} />
        {label}
    </div>
);

const MobileNavItem = ({ icon: Icon, label, active }: { icon: any, label: string, active: boolean }) => (
    <div className={`mobile-nav-item ${active ? 'active' : ''}`}>
        <Icon size={20} />
        <span>{label}</span>
    </div>
);
