import { Redis } from '@upstash/redis';

// Initialize Redis
export const redis = Redis.fromEnv();
console.debug('Initialized Redis');
