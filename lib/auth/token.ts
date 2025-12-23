import { randomBytes } from 'crypto';
import { sign, verify } from 'jsonwebtoken';

// Safely access the secret to avoid runtime crash if missing during build, but will fail at runtime if not set
const getJwtSecret = () => {
    const secret = process.env.NEXT_PUBLIC_AUTH_JWT_SECRET;
    if (!secret) throw new Error('NEXT_PUBLIC_AUTH_JWT_SECRET is not set');
    return Buffer.from(secret.split('base64:')[1] || secret, 'base64');
};

export const generateRandomToken = (bytes = 32) => randomBytes(bytes).toString('hex');

export const signRefreshToken = (payload: { sessionId: string; userId: string }) =>
    sign(payload, getJwtSecret(), { expiresIn: '30d', algorithm: 'HS256' });

export const verifyRefreshToken = (token: string) =>
    verify(token, getJwtSecret(), { algorithms: ['HS256'] }) as { sessionId: string; userId: string };
