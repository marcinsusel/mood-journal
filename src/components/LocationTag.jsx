import React, { useState } from 'react';
import { MapPin, Loader } from 'lucide-react';

const LocationTag = ({ onLocationFound }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState(null);

    const handleGetLocation = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation not supported');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const coords = { lat: latitude, lng: longitude };

                try {
                    // Attempt reverse geocoding via OpenStreetMap (Nominatim)
                    // Strictly for demo purposes. In production, use a proper paid API or proxy.
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
                    if (response.ok) {
                        const data = await response.json();
                        const city = data.address.city || data.address.town || data.address.village || 'Unknown City';
                        const country = data.address.country;
                        const locString = `${city}, ${country}`;
                        setAddress(locString);
                        onLocationFound({ ...coords, label: locString });
                    } else {
                        setAddress(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
                        onLocationFound({ ...coords, label: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` });
                    }
                } catch (e) {
                    console.error("Reverse geocode failed", e);
                    // Fallback to coords
                    setAddress(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
                    onLocationFound({ ...coords, label: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` });
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                setError('Unable to retrieve location');
                setLoading(false);
            }
        );
    };

    return (
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Location
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={loading || address}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: error ? 'var(--mood-sad)' : address ? 'var(--mood-joyful)' : 'var(--bg-secondary)',
                        color: 'white',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s'
                    }}
                >
                    {loading ? <Loader className="animate-spin" size={16} /> : <MapPin size={16} />}
                    {loading ? 'Locating...' : address ? 'Located' : 'Add Location'}
                </button>

                {address && (
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                        {address}
                    </span>
                )}

                {error && (
                    <span style={{ color: 'var(--mood-sad)', fontSize: '0.9rem' }}>
                        {error}
                    </span>
                )}
            </div>
        </div>
    );
};

export default LocationTag;
