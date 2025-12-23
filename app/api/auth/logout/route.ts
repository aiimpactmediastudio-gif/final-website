import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/client';
import { verifyRefreshToken } from '@/lib/auth/token';
import { checkRate } from '@/lib/auth/rateLimiter';

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    try {
        checkRate(ip);
    } catch (e: any) {
        return NextResponse.json({ error: 'Too many requests', retryAfter: e.retryAfter }, { status: 429 });
    }

    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = new Map(cookieHeader.split(';').map(c => [c.trim().split('=')[0], c.trim().split('=')[1]]));
    const refreshToken = cookies.get('refresh_token');

    if (!refreshToken) {
        // Still clear cookie to be safe
        const resp = NextResponse.json({ message: 'already logged out' });
        resp.cookies.delete('refresh_token');
        return resp;
    }

    // Verify token to get sessionId
    let payload;
    try {
        payload = verifyRefreshToken(refreshToken);
    } catch {
        const resp = NextResponse.json({ error: 'invalid token' }, { status: 400 });
        resp.cookies.delete('refresh_token');
        return resp;
    }

    // Revoke session row
    await supabaseServer(req).from('refresh_sessions').update({ revoked: true }).eq('id', payload.sessionId);

    // Delete cookie
    const response = NextResponse.json({ message: 'logged out' });
    response.cookies.delete('refresh_token');
    return response;
}
