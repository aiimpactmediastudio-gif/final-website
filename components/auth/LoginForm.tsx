'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<string | null>(null);
    const [mfaUserId, setMfaUserId] = useState<string | null>(null);
    const [mfaToken, setMfaToken] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Logging in…');
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                deviceFingerprint: navigator.userAgent // simple fingerprint
            })
        });
        const data = await res.json();
        if (res.ok) {
            router.push('/');
            router.refresh(); // Ensure strict refresh to update server-side session checks
        } else {
            setStatus(data.error);
        }
    };
    const handleMfaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Verifying MFA…');
        const res = await fetch('/api/auth/mfa/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: mfaToken })
        });
        const data = await res.json();
        if (res.ok) {
            // MFA succeeded, reload page to complete login
            router.push('/');
            router.refresh();
        } else {
            setStatus(data.error);
        }
    };

    return (
        <>
            {!mfaUserId ? (
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
                        placeholder="Password"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Log In
                    </button>
                    {status && <p className="mt-2 text-sm text-center">{status}</p>}
                </form>
            ) : (
                <form onSubmit={handleMfaSubmit} className="space-y-4">
                    <input
                        className="w-full p-2 border rounded text-black"
                        placeholder="MFA Code"
                        type="text"
                        required
                        value={mfaToken}
                        onChange={e => setMfaToken(e.target.value)}
                    />
                    <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Verify MFA
                    </button>
                    {status && <p className="mt-2 text-sm text-center">{status}</p>}
                </form>
            )}
        </>
    );
};
