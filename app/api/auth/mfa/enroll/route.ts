// app/api/auth/mfa/enroll/route.ts
/* eslint-disable */
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/client';
import { z } from 'zod';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

// Schema for enrollment request (must be authenticated)
const enrollSchema = z.object({
    // No body needed; we derive user from session
});

export async function POST(req: Request) {
    const supabase = supabaseServer(req);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    // Generate a TOTP secret for the user
    const secret = speakeasy.generateSecret({ length: 20, name: `AI Impact Media (${session.user.email})` });

    // Store the secret (base32) in user metadata (or a separate table in production)
    const { error: metaError } = await supabase.auth.updateUser({
        data: { mfa_secret: secret.base32 }
    });
    if (metaError) {
        return NextResponse.json({ error: 'Failed to store MFA secret' }, { status: 500 });
    }

    // Generate QR code data URL for the otpauth URL
    const otpauthUrl = secret.otpauth_url as string;
    const qrDataUrl = await QRCode.toDataURL(otpauthUrl);

    return NextResponse.json({
        message: 'MFA enrollment successful',
        qrDataUrl,
        otpauthUrl,
    });
}
