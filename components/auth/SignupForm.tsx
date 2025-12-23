'use client';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

export const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Submitting…');
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, displayName })
        });
        const data = await res.json();
        setStatus(res.ok ? data.message : data.error);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="w-full p-2 border rounded text-black"
                placeholder="Email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                className="w-full p-2 border rounded text-black"
                placeholder="Display name (optional)"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
            />
            <input
                className="w-full p-2 border rounded text-black"
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Create Account
            </button>
            {status && <p className="mt-2 text-sm text-center">{status}</p>}
        </form>
    );
};
