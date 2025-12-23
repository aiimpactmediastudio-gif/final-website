"use server"

import { createClient } from "@supabase/supabase-js"
import { sendPasswordResetEmail } from "./email"

export async function requestPasswordReset(email: string) {
    // 1. Validate Service Role Key presence
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("Missing SUPABASE_SERVICE_ROLE_KEY")
        return { success: false, error: "Internal Configuration Error" }
    }

    try {
        // 2. Create Admin Client
        // Note: We use supabase-js directly for admin operations as @supabase/ssr might be tailored for client context
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        )

        // 3. Generate Recovery Link
        // Priority:
        // 1. configuration.NEXT_PUBLIC_SITE_URL (Your custom domain: https://impactaistudio.com)
        // 2. process.env.VERCEL_URL (Automatic Vercel URL: https://app.vercel.app)
        // 3. Localhost (Development)

        let siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

        if (!siteUrl && process.env.VERCEL_URL) {
            siteUrl = `https://${process.env.VERCEL_URL}`;
        }

        if (!siteUrl) {
            siteUrl = 'http://localhost:3000';
        }

        console.log(`Generating reset link for site: ${siteUrl}`); // Debug log


        // Construct the redirect URL robustly
        // query params: ?next=/auth/reset-password
        const redirectUrl = new URL(`${siteUrl}/auth/callback`);
        redirectUrl.searchParams.set('next', '/auth/reset-password');

        console.log(`Computed redirect URL: ${redirectUrl.toString()}`);

        const { data, error } = await supabaseAdmin.auth.admin.generateLink({
            type: "recovery",
            email,
            options: {
                redirectTo: redirectUrl.toString(),
            }
        })

        if (error) {
            console.error("Supabase Admin Error:", error)
            // SECURITY: Do not reveal if user does not exist.
            // If the error indicates "User not found" (or similar), we must still return success.
            // Supabase admin might return specific errors, so we catch them here.
            // We'll treat all errors as "success" for the frontend to prevent enumeration,
            // unless it's a configuration error which we already handled above.
            return { success: true }
        }

        if (!data.properties?.action_link) {
            console.error("No action_link returned")
            return { success: false, error: "Could not generate reset link" }
        }

        // 4. Send Email via Resend
        const emailResult = await sendPasswordResetEmail(email, data.properties.action_link)

        if (!emailResult.success) {
            return { success: false, error: emailResult.error }
        }

        return { success: true }

    } catch (err) {
        console.error("Unexpected error in requestPasswordReset:", err)
        return { success: false, error: "An unexpected error occurred" }
    }
}
