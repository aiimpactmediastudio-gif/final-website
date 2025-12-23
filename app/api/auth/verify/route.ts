import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/client';
import { checkRate } from '@/lib/auth/rateLimiter';

export async function GET(req: Request) {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    try {
        checkRate(ip);
    } catch (e: any) {
        return NextResponse.json({ error: 'Too many requests', retryAfter: e.retryAfter }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) return NextResponse.json({ error: 'token missing' }, { status: 400 });

    // Find token row
    const supabase = supabaseServer(req);
    const { data: rows, error } = await supabase
        .from('email_verifications')
        .select('id,user_id,expires_at,used')
        .eq('token', token)
        .single();

    if (error || !rows) return NextResponse.json({ error: 'invalid token' }, { status: 400 });
    if (rows.used) return NextResponse.json({ error: 'token already used' }, { status: 400 });
    if (new Date(rows.expires_at) < new Date())
        return NextResponse.json({ error: 'token expired' }, { status: 400 });

    // Mark email as confirmed via Supabase Auth admin
    const { error: confirmErr } = await supabase.auth.admin.updateUserById(rows.user_id, {
        email_confirm: true
    });
    if (confirmErr) return NextResponse.json({ error: confirmErr.message }, { status: 500 });

    // Mark token used
    await supabase
        .from('email_verifications')
        .update({ used: true })
        .eq('id', rows.id);

    // Redirect to UI (hard‑coded success page)
    return NextResponse.redirect(new URL('/auth/verified', process.env.NEXT_PUBLIC_APP_URL));
}
