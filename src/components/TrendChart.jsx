import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TrendChart = ({ data }) => {
    // Data should be sorted by date

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '5px' }}>{label}</p>
                    {payload.map((entry) => (
                        <p key={entry.name} style={{ color: entry.color, fontSize: '0.9rem' }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatDate}
                        stroke="var(--text-muted)"
                        tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                    />
                    <YAxis
                        stroke="var(--text-muted)"
                        tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                        domain={[0, 10]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />

                    <Line
                        type="monotone"
                        dataKey="mood"
                        name="Mood (1-5)"
                        stroke="var(--mood-joyful)"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="anxiety"
                        name="Anxiety"
                        stroke="var(--accent-secondary)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                    />
                    <Line
                        type="monotone"
                        dataKey="depression"
                        name="Depression"
                        stroke="var(--mood-sad)"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendChart;
