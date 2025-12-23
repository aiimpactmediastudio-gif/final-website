'use client';
import { useState } from 'react';

export const RequestResetForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending…');
        const res = await fetch('/api/auth/request-reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        setStatus(data.message ?? data.error);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="w-full p-2 border rounded text-black"
                placeholder="Your email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Send Reset Link
            </button>
            {status && <p className="mt-2 text-sm text-center">{status}</p>}
        </form>
    );
};
