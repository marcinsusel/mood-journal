import React from 'react';

const EMOTIONS_DATA = {
    'ANGER': ['Resentment', 'Irritation', 'Frustration'],
    'FEAR': ['Apprehensive', 'Overwhelmed', 'Threatened'],
    'PAIN': ['Hurt', 'Pity', 'Sad', 'Lonely'],
    'JOY': ['Happy', 'Elated', 'Hopeful'],
    'PASSION': ['Enthusiasm', 'Desire', 'Zest'],
    'LOVE': ['Affection', 'Tenderness', 'Compassion', 'Warmth'],
    'SHAME': ['Embarrassed', 'Humble'],
    'GUILT': ['Regretful', 'Contrite', 'Remorseful']
};

const EMOTION_COLORS = {
    'ANGER': '#ef4444', // Red
    'FEAR': '#f97316', // Orange
    'PAIN': '#a855f7', // Purple
    'JOY': '#22c55e', // Green
    'PASSION': '#eab308', // Yellow/Gold
    'LOVE': '#ec4899', // Pink
    'SHAME': '#64748b', // Slate
    'GUILT': '#475569', // Dark Slate
};

const EmotionSelector = ({ selectedEmotions = [], onChange }) => {
    const toggleEmotion = (emotion) => {
        if (selectedEmotions.includes(emotion)) {
            onChange(selectedEmotions.filter(e => e !== emotion));
        } else {
            onChange([...selectedEmotions, emotion]);
        }
    };

    return (
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                What emotions are you feeling?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {Object.entries(EMOTIONS_DATA).map(([category, descendants]) => (
                    <div key={category} className="glass-panel" style={{ padding: 'var(--spacing-sm)', background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                            {/* Main Category */}
                            <button
                                type="button"
                                onClick={() => toggleEmotion(category)}
                                style={{
                                    padding: '6px 16px',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid',
                                    borderColor: selectedEmotions.includes(category) ? EMOTION_COLORS[category] : 'rgba(255,255,255,0.1)',
                                    background: selectedEmotions.includes(category) ? EMOTION_COLORS[category] : 'transparent',
                                    color: selectedEmotions.includes(category) ? 'white' : 'var(--text-primary)',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {category}
                            </button>

                            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 8px' }}></div>

                            {/* Descendants */}
                            {descendants.map(descendant => (
                                <button
                                    key={descendant}
                                    type="button"
                                    onClick={() => toggleEmotion(descendant)}
                                    style={{
                                        padding: '4px 10px',
                                        borderRadius: 'var(--radius-full)',
                                        border: '1px solid',
                                        borderColor: selectedEmotions.includes(descendant) ? EMOTION_COLORS[category] : 'rgba(255,255,255,0.1)',
                                        background: selectedEmotions.includes(descendant) ? `${EMOTION_COLORS[category]}40` : 'transparent', // 25% opacity
                                        color: selectedEmotions.includes(descendant) ? 'white' : 'var(--text-secondary)',
                                        fontSize: '0.8rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {descendant}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmotionSelector;
