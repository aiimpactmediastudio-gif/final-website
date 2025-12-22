"use server";

import { resend } from "@/lib/resend";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";

export async function sendWelcomeEmail(email: string, name: string = "User") {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn("Resend API Key is missing. Email not sent.");
            return { success: false, error: "Configuration Error" };
        }

        const { data, error } = await resend.emails.send({
            from: "AI IMPACT MEDIA <onboarding@impactaistudio.com>",
            to: [email],
            subject: "Welcome to AI IMPACT MEDIA",
            react: WelcomeEmail({ name }) as React.ReactElement,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Email Sending Failed:", error);
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
}
