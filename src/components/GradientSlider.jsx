import React from 'react';

const GradientSlider = ({ label, value, onChange, min = 0, max = 10, colorStart = '#22c55e', colorEnd = '#ef4444' }) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                <label style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</label>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{value}</span>
            </div>
            <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={{
                        background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
                        zIndex: 1
                    }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>Low</span>
                <span>High</span>
            </div>
        </div>
    );
};

export default GradientSlider;
