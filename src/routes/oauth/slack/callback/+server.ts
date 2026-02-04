import axios, { HttpStatusCode } from "axios";
import type { RequestHandler } from "./$types";
import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    if (url.searchParams.get("error") == "access_denied") {
        return new Response("Authorization aborted", { status: HttpStatusCode.Unauthorized });
    }

    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code) {
        console.error("Code was null");
        return new Response("Invalid request. Missing code", {
            status: HttpStatusCode.BadRequest,
        });
    }
    if (!state) {
        console.error("State was null. But I don't care");
        // return new Response("Invalid request. Missing state", {
        //     status: HttpStatusCode.BadRequest,
        // });
    }

    // Standard Slack OAuth flow, exchange `code` for access tokens
    const token_response = await axios
        .post(
            "https://slack.com/api/oauth.v2.access",
            {
                code,
                client_id: SLACK_CLIENT_ID,
                client_secret: SLACK_CLIENT_SECRET,
                redirect_uri: `${url.origin}/oauth/slack/callback`,
            },
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            },
        )
        .then((r) => r.data);

    if (token_response.ok === true) {
        console.debug(token_response);

        const my_deep_link = new URL("luxafor-ui://auth");
        my_deep_link.searchParams.set("user_token", token_response.authed_user.access_token);
        my_deep_link.searchParams.set("bot_token", token_response.access_token);

        redirect(302, my_deep_link);

        // TODO: Redirect to a proper success page,
        // send the OAuth tokens to the page (secretly)
        // and have _that_ page redirect to the deep-link
    } else {
        console.error("Error from slack redirect");
        // TODO: Replace with a real .svelte error page
        return new Response(`<h1>Error fetching token: ${token_response.error}</h1>`, {
            status: HttpStatusCode.InternalServerError,
            headers: {
                "Content-Type": "text/html",
            },
        });
    }
};
