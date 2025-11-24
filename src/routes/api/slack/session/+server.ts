import type { RequestHandler } from "./$types";
import { redis } from "$lib/server/redis";
import { randomBytes } from "crypto";
import { BASE_DOMAIN } from "$env/static/private";
import { SessionState, type SlackSession } from "$lib/types/definitions";

// Create a new "SlackAuthSession"
export const POST: RequestHandler = async () => {
    const session_id = randomBytes(16).toString("hex");
    const session_secret = randomBytes(16).toString("hex");

    const entry_key = `slack_session:${session_id}`;
    const entry_value: SlackSession = {
        status: SessionState.Pending,
        session_secret,
    };

    const options = { ex: 300 }; // TTL: 5 minutes

    await redis.set(entry_key, entry_value, options);

    const authorize_url = new URL(`${BASE_DOMAIN}/oauth/slack`);
    authorize_url.searchParams.set("session_id", session_id);
    authorize_url.searchParams.set("session_secret", session_secret);

    const poll_url = new URL(`${BASE_DOMAIN}/api/slack/session/status`);
    poll_url.searchParams.set("session_id", session_id);
    poll_url.searchParams.set("session_secret", session_secret);

    return Response.json({ session_id, session_secret, authorize_url, poll_url });
};
