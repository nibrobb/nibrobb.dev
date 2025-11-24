import axios, { HttpStatusCode } from 'axios';
import type { RequestHandler } from './$types';
import { redis } from '$lib/server/redis';
import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, SLACK_REDIRECT_URI } from '$env/static/private';
import { SessionState, type SlackSession } from '$lib/types/definitions';

export const GET: RequestHandler = async ({ url }) => {
	if (url.searchParams.get('error') == 'access_denied') {
		return new Response('Authorization aborted', { status: HttpStatusCode.Unauthorized });
	}

	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	if (!code) {
		console.error('Code was null');
		return new Response('Invalid request. Missing code', { status: HttpStatusCode.BadRequest });
	}
	if (!state) {
		console.error('State was null');
		return new Response('Invalid request. Missing state', { status: HttpStatusCode.BadRequest });
	}

	const [session_id, session_secret] = state.split('::');
	const entry_key = `slack_session:${session_id}`;
	const entry: SlackSession | null = await redis.get(entry_key);

	if (!entry || entry.session_secret !== session_secret) {
		return new Response('Invalid session', { status: HttpStatusCode.NotFound });
	}

	// Standard Slack OAuth flow, exchange `code` for access tokens
	const token_response = await axios
		.post(
			'https://slack.com/api/oauth.v2.access',
			{
				code,
				client_id: SLACK_CLIENT_ID,
				client_secret: SLACK_CLIENT_SECRET,
				redirect_uri: SLACK_REDIRECT_URI
			},
			{
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}
		)
		.then((r) => r.data);

	if (token_response.ok === true) {
		console.debug(token_response);
		// Store tokens
		const to_store: SlackSession = {
			status: SessionState.Ok,
			tokens: {
				user_token: token_response?.authed_user?.access_token,
				bot_token: token_response?.access_token
			}
		};
		await redis.set(
			entry_key,
			to_store,
			{ ex: 60 } // tokens only need to live briefly
		);
		console.debug(`Storing in Redis:\n${to_store}`);

		// TODO: Replace with proper success page
		return new Response('Slack connected. You can close this window', {
			headers: { 'Content-Type': 'text/plain' }
		});
	} else {
		console.error('Error from slack redirect');
		return new Response(`Error fetching token: ${token_response.error}`, {
			status: HttpStatusCode.InternalServerError
		});
	}
};
