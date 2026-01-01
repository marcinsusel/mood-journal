import React from 'react';
import { NavLink } from 'react-router-dom';
import { Smile, BarChart2 } from 'lucide-react';
import { useMood } from '../context/MoodContext'; // Assuming MoodContext is in ../context/MoodContext

const Layout = ({ children }) => {
    const { login, logout, user, isSyncing } = useMood();

    return (
        <div className="layout-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header className="glass-panel" style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                margin: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ fontSize: '1.25rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Mood<span style={{ color: 'var(--accent-primary)', WebkitTextFillColor: 'initial' }}>Journal</span>
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {isSyncing ? 'Syncing...' : 'Synced'}
                            </span>
                            <button onClick={logout} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            style={{
                                background: 'white',
                                color: '#333',
                                padding: '6px 14px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: 14, height: 14 }} />
                            Sign In
                        </button>
                    )}

                    <nav style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                color: isActive ? 'white' : 'var(--text-secondary)',
                                background: isActive ? 'var(--accent-primary)' : 'transparent',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                fontWeight: 500
                            })}
                        >
                            <Smile size={18} />
                            <span>Check-in</span>
                        </NavLink>
                        <NavLink
                            to="/history"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                color: isActive ? 'white' : 'var(--text-secondary)',
                                background: isActive ? 'var(--accent-primary)' : 'transparent',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                fontWeight: 500
                            })}
                        >
                            <BarChart2 size={18} />
                            <span>History</span>
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="container" style={{ flex: 1, width: '100%' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
