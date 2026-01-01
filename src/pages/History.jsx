import React, { useState } from 'react';
import { useMood } from '../context/MoodContext';
import TrendChart from '../components/TrendChart';
import { Trash2, MapPin } from 'lucide-react';

const History = () => {
    const { entries, deleteEntry } = useMood();
    const [filter, setFilter] = useState('all'); // all, month, week

    const getFilteredEntries = () => {
        if (filter === 'all') return entries;
        const now = new Date();
        const msPerDay = 24 * 60 * 60 * 1000;

        return entries.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            const diffTime = Math.abs(now - entryDate);
            const diffDays = Math.ceil(diffTime / msPerDay);

            if (filter === 'week') return diffDays <= 7;
            if (filter === 'month') return diffDays <= 30;
            return true;
        });
    };

    const filteredEntries = getFilteredEntries().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Sort for chart (ascending)
    const reversedEntries = [...filteredEntries].reverse(); // Sort for list (descending)

    const getEmoji = (val) => {
        if (val === 1) return '😢';
        if (val === 2) return '🙁';
        if (val === 3) return '😌';
        if (val === 4) return '🙂';
        return '😃';
    };

    return (
        <div style={{ paddingBottom: 'var(--spacing-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h2>History & Trends</h2>
                <div className="glass-panel" style={{ padding: '4px', display: 'flex', borderRadius: 'var(--radius-full)' }}>
                    {['week', 'month', 'all'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '4px 12px',
                                borderRadius: 'var(--radius-full)',
                                background: filter === f ? 'rgba(255,255,255,0.1)' : 'transparent',
                                color: filter === f ? 'var(--text-primary)' : 'var(--text-muted)',
                                fontSize: '0.85rem',
                                fontWeight: 500
                            }}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="glass-panel" style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                <h4 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-secondary)' }}>Mood Trends</h4>
                {filteredEntries.length > 0 ? (
                    <TrendChart data={filteredEntries} />
                ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No data for this period</div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
                <h4>Recent Entries</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {reversedEntries.map((entry) => (
                    <div key={entry.id} className="glass-panel" style={{ padding: 'var(--spacing-sm)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: '2rem' }}>{getEmoji(entry.mood)}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    {new Date(entry.timestamp).toLocaleString()}
                                </span>
                                <button onClick={() => deleteEntry(entry.id)} style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            {entry.note && <p style={{ marginTop: '4px', fontSize: '0.95rem' }}>{entry.note}</p>}

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                <span>Anxiety: <span style={{ color: entry.anxiety > 5 ? 'var(--mood-sad)' : 'var(--mood-joyful)' }}>{entry.anxiety}</span></span>
                                <span>Depression: <span style={{ color: entry.depression > 5 ? 'var(--mood-sad)' : 'var(--mood-joyful)' }}>{entry.depression}</span></span>
                                {entry.location && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                        <MapPin size={10} /> {entry.location.label || 'Unknown'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {reversedEntries.length === 0 && (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                        No entries found. Go check in!
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
