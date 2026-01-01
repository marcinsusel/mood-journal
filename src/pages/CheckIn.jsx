import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMood } from '../context/MoodContext';
import EmojiMoodSelector from '../components/EmojiMoodSelector';
import GradientSlider from '../components/GradientSlider';
import NoteInput from '../components/NoteInput';
import LocationTag from '../components/LocationTag';

const CheckIn = () => {
    const { addEntry } = useMood();
    const navigate = useNavigate();

    const [mood, setMood] = useState(3);
    const [anxiety, setAnxiety] = useState(0);
    const [depression, setDepression] = useState(0);
    const [note, setNote] = useState('');
    const [location, setLocation] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const entry = {
            mood,
            anxiety,
            depression,
            note,
            location,
        };
        addEntry(entry);
        navigate('/history');
    };

    return (
        <div className="glass-panel" style={{ padding: 'var(--spacing-md)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>Daily Check-in</h2>

            <form onSubmit={handleSubmit}>
                <EmojiMoodSelector value={mood} onChange={setMood} />

                <div style={{ display: 'grid', gap: 'var(--spacing-md)', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                    <GradientSlider
                        label="Anxiety Level"
                        value={anxiety}
                        onChange={setAnxiety}
                        colorStart="#22c55e"
                        colorEnd="#ef4444"
                    />
                    <GradientSlider
                        label="Depression Level"
                        value={depression}
                        onChange={setDepression}
                        colorStart="#22c55e"
                        colorEnd="#3b82f6"
                    />
                </div>

                <NoteInput value={note} onChange={setNote} />

                <LocationTag onLocationFound={setLocation} />

                <div className="flex-center" style={{ marginTop: 'var(--spacing-lg)' }}>
                    <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>
                        Save Entry
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckIn;
