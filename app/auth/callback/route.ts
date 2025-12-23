import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // Default to homepage, but support 'next' param
    let next = searchParams.get('next') ?? '/';
    const type = searchParams.get('type'); // 'recovery', 'signup', etc.

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // If this is a password recovery flow, FORCE redirect to signup with reset view
            if (type === 'recovery') {
                return NextResponse.redirect(`${origin}/auth/signup?view=reset`);
            }
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
