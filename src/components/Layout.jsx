import React from 'react';
import { NavLink } from 'react-router-dom';
import { Smile, BarChart2 } from 'lucide-react';

const Layout = ({ children }) => {
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
            </header>

            <main className="container" style={{ flex: 1, width: '100%' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
