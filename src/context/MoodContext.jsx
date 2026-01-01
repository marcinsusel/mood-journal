import React, { createContext, useContext, useState, useEffect } from 'react';

const MoodContext = createContext();

export const useMood = () => {
    const context = useContext(MoodContext);
    if (!context) {
        throw new Error('useMood must be used within a MoodProvider');
    }
    return context;
};

export const MoodProvider = ({ children }) => {
    const [entries, setEntries] = useState(() => {
        const savedEntries = localStorage.getItem('mood_journal_entries');
        return savedEntries ? JSON.parse(savedEntries) : [];
    });

    useEffect(() => {
        localStorage.setItem('mood_journal_entries', JSON.stringify(entries));
    }, [entries]);

    const addEntry = (entry) => {
        const newEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            ...entry,
        };
        setEntries((prev) => [newEntry, ...prev]);
    };

    const deleteEntry = (id) => {
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
    };

    const clearHistory = () => {
        if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
            setEntries([]);
        }
    };

    return (
        <MoodContext.Provider value={{ entries, addEntry, deleteEntry, clearHistory }}>
            {children}
        </MoodContext.Provider>
    );
};
