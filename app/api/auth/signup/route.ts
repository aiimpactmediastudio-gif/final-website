import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/client';
import { generateRandomToken } from '@/lib/auth/token';
import { sendVerificationEmail } from '@/lib/auth/email';
import { checkRate } from '@/lib/auth/rateLimiter';
import { z } from 'zod';
import zxcvbn from 'zxcvbn';

// Ruthless Validation Schema
const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(12, "Password must be at least 12 characters"),
    displayName: z.string().optional(),
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
        const { email, password, displayName } = signupSchema.parse(body);

        // 3️⃣ Password Strength Enforcement (Ruthless)
        const passwordStrength = zxcvbn(password);
        if (passwordStrength.score < 3) {
            return NextResponse.json({
                error: 'Password is too weak.',
                details: passwordStrength.feedback.suggestions
            }, { status: 400 });
        }

        // 4️⃣ Create user via Supabase Auth (service role)
        const supabase = supabaseServer(req);
        const { data: { user }, error: supError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: false,
            user_metadata: { display_name: displayName ?? '' }
        });

        if (supError) {
            // Ruthless: Don't leak exact database errors if possible, 
            // but for signup "User already exists" is hard to Mask without sending a fake success.
            // For now, we'll return the error but formatted cleanly.
            return NextResponse.json({ error: supError.message }, { status: 400 });
        }

        // 5️⃣ Store profile
        if (user) {
            await supabase.from('profiles').insert({
                id: user.id,
                display_name: displayName ?? '',
                created_at: new Date()
            });

            // 6️⃣ Create verification token
            const token = generateRandomToken();
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

            await supabase.from('email_verifications').insert({
                user_id: user.id,
                token,
                expires_at: expiresAt
            });

            // 7️⃣ Send email
            await sendVerificationEmail(email, token);
        }

        return NextResponse.json({ message: 'Signup successful. Verification email sent.' }, { status: 201 });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
