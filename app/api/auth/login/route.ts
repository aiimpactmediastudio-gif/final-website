import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/client';
import { signRefreshToken } from '@/lib/auth/token';
import { checkRate } from '@/lib/auth/rateLimiter';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    deviceFingerprint: z.string().optional(),
});

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';

    // 1️⃣ Rate Limiting (Ruthless)
    try {
        checkRate(ip);
    } catch (e: any) {
        return NextResponse.json({
            error: 'Too many requests. Process terminated.',
            retryAfter: e.retryAfter
        }, { status: 429 });
    }

    try {
        const body = await req.json();

        // 2️⃣ Strict Schema Validation
        const { email, password, deviceFingerprint } = loginSchema.parse(body);

        // 3️⃣ Authenticate via Supabase
        const supabase = supabaseServer(req);
        const { data: { session, user }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error || !user) {
            // Ruthless: Generic error message to prevent enumeration
            return NextResponse.json({
                error: 'Invalid login credentials.',
                code: 'AUTH_FAILED'
            }, { status: 401 });
        }

        // 4️⃣ Create our own refresh session (revocable)
        const refreshId = crypto.randomUUID();
        const refreshToken = signRefreshToken({ sessionId: refreshId, userId: user.id });

        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 d

        await supabase.from('refresh_sessions').insert({
            id: refreshId,
            user_id: user.id,
            token: refreshToken,
            device_fingerprint: deviceFingerprint ?? null,
            expires_at: expiresAt
        });

        // 5️⃣ Set HttpOnly cookie for the refresh token
        const response = NextResponse.json({
            message: 'Login successful',
            session, // Return the full session for the client to use
            accessToken: session?.access_token,
            user: { id: user.id, email: user.email, display_name: user.user_metadata?.display_name }
        });

        response.cookies.set({
            name: 'refresh_token',
            value: refreshToken,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 // 30 days
        });

        return response;

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
