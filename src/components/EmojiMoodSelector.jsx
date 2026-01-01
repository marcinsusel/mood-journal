import React from 'react';

const MOODS = [
    { value: 1, label: 'Sad', emoji: '😢', color: 'var(--mood-sad)' },
    { value: 2, label: 'Slightly Sad', emoji: '🙁', color: 'var(--mood-slightly-sad)' },
    { value: 3, label: 'Content', emoji: '😌', color: 'var(--mood-content)' },
    { value: 4, label: 'Slightly Joyful', emoji: '🙂', color: 'var(--mood-neutral)' }, // Using neutral/yellow for slightly joyful
    { value: 5, label: 'Joyful', emoji: '😃', color: 'var(--mood-joyful)' },
];

const EmojiMoodSelector = ({ value, onChange }) => {
    return (
        <div className="mood-selector" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                How are you feeling?
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                {MOODS.map((mood) => {
                    const isSelected = value === mood.value;
                    return (
                        <button
                            type="button"
                            key={mood.value}
                            onClick={() => onChange(mood.value)}
                            title={mood.label}
                            style={{
                                fontSize: '2.5rem',
                                padding: '0.5rem',
                                borderRadius: '50%',
                                background: isSelected ? 'rgba(255,255,255,0.1)' : 'transparent',
                                transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                filter: isSelected ? 'grayscale(0)' : 'grayscale(0.7) opacity(0.7)',
                                boxShadow: isSelected ? `0 0 20px ${mood.color}` : 'none',
                                position: 'relative'
                            }}
                        >
                            <span role="img" aria-label={mood.label}>{mood.emoji}</span>
                            {isSelected && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.75rem',
                                    color: mood.color,
                                    whiteSpace: 'nowrap',
                                    fontWeight: 600
                                }}>
                                    {mood.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default EmojiMoodSelector;
