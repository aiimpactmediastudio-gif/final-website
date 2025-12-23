import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/client';
import { checkRate } from '@/lib/auth/rateLimiter';

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    try {
        checkRate(ip);
    } catch (e: any) {
        return NextResponse.json({ error: 'Too many requests', retryAfter: e.retryAfter }, { status: 429 });
    }

    const { token, newPassword } = await req.json();
    if (!token || !newPassword) {
        return NextResponse.json({ error: 'token & newPassword required' }, { status: 400 });
    }

    // Find token row
    const supabase = supabaseServer(req);
    const { data: row, error } = await supabase
        .from('password_resets')
        .select('id,user_id,expires_at,used')
        .eq('token', token)
        .single();

    if (error || !row) return NextResponse.json({ error: 'invalid token' }, { status: 400 });
    if (row.used) return NextResponse.json({ error: 'token already used' }, { status: 400 });
    if (new Date(row.expires_at) < new Date())
        return NextResponse.json({ error: 'token expired' }, { status: 400 });

    // Update password via Supabase admin
    const { error: updErr } = await supabase.auth.admin.updateUserById(row.user_id, {
        password: newPassword
    });
    if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

    // Mark token used
    await supabase.from('password_resets').update({ used: true }).eq('id', row.id);

    // Invalidate all refresh sessions for this user (brutal!)
    await supabase
        .from('refresh_sessions')
        .update({ revoked: true })
        .eq('user_id', row.user_id);

    return NextResponse.json({ message: 'password reset successful' });
}
