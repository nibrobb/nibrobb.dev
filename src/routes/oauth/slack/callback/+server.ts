import type { RequestHandler } from "./$types";
import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { type OauthV2AccessResponse, WebClient } from '@slack/web-api';

export const GET: RequestHandler = async ({ url }) => {
    const errorPageUrl = new URL("/oauth/slack/error", url.origin);

    if (url.searchParams.get("error") == "access_denied") {
        errorPageUrl.searchParams.set("reason", "access_denied");
        throw redirect(302, errorPageUrl.toString());
    }

    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code) {
        console.error("Code was null");
        errorPageUrl.searchParams.set("reason", "missing_code");
        throw redirect(302, errorPageUrl.toString());
    }
    if (!state) {
        console.error("State was null. But I don't care");
    }

    let token_response: OauthV2AccessResponse;
    const slack_client = new WebClient();

    try {
        // Standard Slack OAuth flow, exchange `code` for access tokens
        token_response = await slack_client.oauth.v2.access({
            code,
            client_id: SLACK_CLIENT_ID,
            client_secret: SLACK_CLIENT_SECRET,
            redirect_uri: `${url.origin}/oauth/slack/callback`,
        });
    } catch (error) {
        console.error("OAuth callback failed", error);
        errorPageUrl.searchParams.set("reason", "oauth_callback_exception");
        throw redirect(302, errorPageUrl.toString());
    }

    if (token_response.ok && token_response.authed_user?.access_token && token_response.access_token) {
        console.debug(token_response);

        const successPageUrl = new URL("/oauth/slack/success", url.origin);
        const hashParams = new URLSearchParams({
            user_token: token_response.authed_user.access_token,
            bot_token: token_response.access_token,
        });
        successPageUrl.hash = hashParams.toString();
        throw redirect(302, successPageUrl.toString());
    }

    console.error("Error from slack redirect");
    errorPageUrl.searchParams.set("reason", token_response.error ?? "oauth_exchange_failed");
    throw redirect(302, errorPageUrl.toString());
};
