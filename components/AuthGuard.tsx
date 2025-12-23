'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

// Public routes that do NOT require authentication
const PUBLIC_ROUTES = [
    '/',               // landing page
    '/login',
    '/auth/login',
    '/signup',
    '/auth/signup',
    '/forgot-password',
    '/reset-password',
    '/auth/reset-password',
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Only run on mount and path change
        const check = async () => {
            const { data: { user } } = await supabaseBrowser.auth.getUser();

            const isPublic = PUBLIC_ROUTES.includes(pathname);

            // 1️⃣ Unauthenticated → protected route → kick out
            if (!user && !isPublic) {
                router.replace('/');
                return;
            }

            // 2️⃣ Authenticated → trying to hit login/signup → send home
            if (user && (pathname === '/login' || pathname === '/auth/login' ||
                pathname === '/signup' || pathname === '/auth/signup')) {
                router.replace('/');
                return;
            }
        };
        check();
    }, [pathname, router]);

    return <>{children}</>;
}
