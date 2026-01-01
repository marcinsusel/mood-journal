import React, { createContext, useContext, useState, useEffect } from 'react';

import { initGoogleDrive, requestLogin, findFile, readFile, createFile, updateFile } from '../utils/googleDrive';

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
    const [user, setUser] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [driveFileId, setDriveFileId] = useState(null);

    useEffect(() => {
        localStorage.setItem('mood_journal_entries', JSON.stringify(entries));
        if (driveFileId && user) {
            performSync(entries, driveFileId);
        }
    }, [entries]);

    useEffect(() => {
        const init = async () => {
            try {
                initGoogleDrive((success) => {
                    if (success) console.log("Google Drive API Initialized");
                });
            } catch (e) {
                console.error("Failed to init GAPI", e);
            }
        };
        init();
    }, []);

    const performSync = async (currentEntries, fileId) => {
        setIsSyncing(true);
        try {
            await updateFile(fileId, currentEntries);
        } catch (e) {
            console.error("Sync failed", e);
        } finally {
            setIsSyncing(false);
        }
    };

    const login = async () => {
        try {
            const resp = await requestLogin();
            if (resp && resp.access_token) {
                setUser({ token: resp.access_token });
                setIsSyncing(true);

                // Check for existing file
                let fileId = await findFile();

                if (fileId) {
                    setDriveFileId(fileId);
                    const cloudData = await readFile(fileId);
                    if (Array.isArray(cloudData)) {
                        // Merge strategy: Cloud wins for simplicity in this demo, or we could merge by ID.
                        // Let's ask user? Or just overwrite local for now if cloud exists.
                        // Better: Merge unique IDs.
                        const merged = [...cloudData];
                        entries.forEach(local => {
                            if (!merged.find(m => m.id === local.id)) {
                                merged.push(local);
                            }
                        });
                        // Sort descending
                        merged.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                        setEntries(merged);

                        // Push merged back to cloud immediately
                        await updateFile(fileId, merged);
                    }
                } else {
                    // Create new file with current local data
                    const newFile = await createFile(entries);
                    setDriveFileId(newFile.id);
                }
                setIsSyncing(false);
            }
        } catch (e) {
            console.error("Login failed", e);
            setIsSyncing(false);
        }
    };

    const logout = () => {
        setUser(null);
        setDriveFileId(null);
        // Optional: revoke token
    };

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
        <MoodContext.Provider value={{ entries, addEntry, deleteEntry, clearHistory, login, logout, user, isSyncing }}>
            {children}
        </MoodContext.Provider>
    );
};
