import { createBrowserClient } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';

// Browser (client‑side) – used in UI components
export const supabaseBrowser = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server (edge/SSR) – used in API routes & middleware
export const supabaseServer = (req?: Request) => {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    // Adapt to handle potential undefined request or extract cookies safely
                    if (!req) return [];
                    const cookieHeader = req.headers.get('cookie') ?? '';
                    return cookieHeader.split(';').map(c => {
                        const [name, ...value] = c.trim().split('=');
                        return { name, value: value.join('=') };
                    });
                },
                setAll(cookiesToSet) {
                    // No-op for API routes usually, specific logic needed if setting cookies in response
                }
            }
        }
    );
}
