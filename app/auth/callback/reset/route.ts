import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Force verify session before redirecting
            // This ensures the session cookie is properly set and recognized
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                // Determine redirect URL based on environment
                const forwardedHost = request.headers.get('x-forwarded-host');
                const isLocalEnv = process.env.NODE_ENV === 'development';
                const next = '/auth/reset-password';

                if (isLocalEnv) {
                    return NextResponse.redirect(`${origin}${next}`);
                } else if (forwardedHost) {
                    return NextResponse.redirect(`https://${forwardedHost}${next}`);
                } else {
                    return NextResponse.redirect(`${origin}${next}`);
                }
            }
        }
    }

    // Return to error page if functionality fails
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
