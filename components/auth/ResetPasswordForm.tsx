'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token') ?? '';
    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Resetting…');
        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        const data = await res.json();
        if (res.ok) {
            router.push('/auth/login?reset=success');
        } else {
            setStatus(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                className="w-full p-2 border rounded text-black"
                placeholder="New password"
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
            />
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Reset Password
            </button>
            {status && <p className="mt-2 text-sm text-center">{status}</p>}
        </form>
    );
};
