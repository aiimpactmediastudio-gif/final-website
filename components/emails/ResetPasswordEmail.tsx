import * as React from 'react';

interface ResetPasswordEmailProps {
    resetLink: string;
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({ resetLink }) => (
    <div style={{ fontFamily: 'sans-serif', color: '#333', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#E50914', marginBottom: '24px' }}>Reset Your Password</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            We received a request to reset the password for your AI IMPACT MEDIA account.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Click the button below to set a new password. This link will expire in 1 hour.
        </p>

        <div style={{ margin: '32px 0' }}>
            <a
                href={resetLink}
                style={{
                    backgroundColor: '#E50914',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    display: 'inline-block'
                }}
            >
                Reset Password
            </a>
        </div>

        <p style={{ fontSize: '14px', color: '#666' }}>
            If you didn't ask to reset your password, you can safely ignore this email.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '32px 0' }} />

        <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
            AI IMPACT MEDIA<br />
            Secure Casting Platform
        </p>
    </div>
);
