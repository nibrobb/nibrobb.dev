import type { RequestHandler } from "./$types";
import { redirect } from "@sveltejs/kit";
import { SLACK_CLIENT_ID, SLACK_REDIRECT_URI } from "$env/static/private";

export const GET: RequestHandler = async ({ url }) => {
    const session_id = url.searchParams.get("session_id");
    const session_secret = url.searchParams.get("session_secret");

    const state = `${session_id}::${session_secret}`;

    const user_scopes = ["users.profile:read", "users.profile:write"];
    const bot_scopes = ["chat:write"];
    const user_scopes_string = user_scopes.join(",");
    const bot_scopes_string = bot_scopes.join(",");

    const redirect_url = new URL("https://slack.com/oauth/v2/authorize");
    redirect_url.searchParams.set("client_id", SLACK_CLIENT_ID);
    redirect_url.searchParams.set("user_scope", user_scopes_string);
    redirect_url.searchParams.set("scope", bot_scopes_string);
    redirect_url.searchParams.set("redirect_uri", SLACK_REDIRECT_URI);
    redirect_url.searchParams.set("state", state);

    console.debug(`Redirecting to: ${redirect_url}`);
    redirect(302, redirect_url);
};
