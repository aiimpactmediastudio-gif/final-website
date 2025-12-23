import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationEmail = async (email: string, token: string) => {
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;
    await resend.emails.send({
        from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
        to: email,
        subject: 'Verify your AI Impact Media account',
        html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email. This link expires in 24 h.</p>`
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;
    await resend.emails.send({
        from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
        to: email,
        subject: 'Reset your AI Impact Media password',
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 60 min.</p>`
    });
};
