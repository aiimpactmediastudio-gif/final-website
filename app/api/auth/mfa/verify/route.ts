// app/api/auth/mfa/verify/route.ts
/* eslint-disable */
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/client';
import { z } from 'zod';
import speakeasy from 'speakeasy';

// Schema for verification request
const verifySchema = z.object({
    token: z.string().min(1), // TOTP code from authenticator app
});

export async function POST(req: Request) {
    const supabase = supabaseServer(req);

    // Ensure user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    // Parse and validate request body
    let body: any;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const parseResult = verifySchema.safeParse(body);
    if (!parseResult.success) {
        return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }
    const { token } = parseResult.data;

    // Retrieve MFA secret from user metadata (stored during enrollment)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return NextResponse.json({ error: 'Unable to retrieve user' }, { status: 500 });
    }
    const mfaSecret = (user.user_metadata as any)?.mfa_secret;
    if (!mfaSecret) {
        return NextResponse.json({ error: 'MFA not set up' }, { status: 400 });
    }

    // Verify the TOTP token
    const isValid = speakeasy.totp.verify({
        secret: mfaSecret,
        encoding: 'base32',
        token,
        window: 1, // allow slight clock drift
    });

    if (!isValid) {
        return NextResponse.json({ error: 'Invalid MFA code' }, { status: 401 });
    }

    // MFA succeeded – you could set a flag or issue a new session token here.
    return NextResponse.json({ message: 'MFA verification successful' }, { status: 200 });
}
