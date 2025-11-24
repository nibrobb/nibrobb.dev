import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();
console.debug("Initialized Redis");
