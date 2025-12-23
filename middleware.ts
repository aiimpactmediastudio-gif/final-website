import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseServer } from '@/lib/supabase/client';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Skip static assets & Next.js internals
    if (pathname.startsWith('/_next') || pathname.includes('.')) return NextResponse.next();

    // Public API endpoints (signup, login, verify, reset, etc.)
    const PUBLIC_API = [
        '/api/auth/signup',
        '/api/auth/login',
        '/api/auth/verify',
        '/api/auth/request-reset',
        '/api/auth/reset-password',
        '/api/auth/refresh',
    ];

    if (PUBLIC_API.some(p => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // All other API routes require a valid session
    if (pathname.startsWith('/api/')) {
        // Note: supabaseServer implementation needs to handle simple token check or session check
        // Here we use getUser which verifies the session cookie or auth header
        const supabase = supabaseServer(req);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    return NextResponse.next();
}

// Apply to all routes under /api/*
export const config = {
    matcher: ['/api/:path*']
};
