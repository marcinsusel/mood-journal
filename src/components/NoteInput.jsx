import React from 'react';

const NoteInput = ({ value, onChange, maxLength = 200 }) => {
    return (
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Why do you feel this way?
            </label>
            <div style={{ position: 'relative' }}>
                <textarea
                    rows={4}
                    value={value}
                    onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
                    placeholder="I slept well..."
                />
                <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    fontSize: '0.75rem',
                    color: value.length >= maxLength ? 'var(--mood-sad)' : 'var(--text-muted)'
                }}>
                    {value.length}/{maxLength}
                </div>
            </div>
        </div>
    );
};

export default NoteInput;
