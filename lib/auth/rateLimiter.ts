import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, { count: number; reset: number }>({
    max: 5000,
    ttl: 60_000 // 1 minute
});

export const checkRate = (ip: string, limit = Number(process.env.AUTH_RATE_LIMIT || 60)) => {
    const now = Date.now();
    const entry = cache.get(ip) ?? { count: 0, reset: now + 60_000 };

    // If entry expired manually (though TTL handles this), reset
    if (now > entry.reset) {
        entry.count = 0;
        entry.reset = now + 60_000;
    }

    entry.count += 1;
    cache.set(ip, entry);

    if (entry.count > limit) {
        const retryAfter = Math.ceil((entry.reset - now) / 1000);
        const err = new Error('Too many requests');
        // @ts-ignore – we attach HTTP‑specific data for the API layer
        err.status = 429;
        // @ts-ignore
        err.retryAfter = retryAfter;
        throw err;
    }
};
