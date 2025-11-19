import axios from 'axios';
import type { RequestHandler } from './$types';
import { redis } from '$lib/server/redis';
import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, SLACK_REDIRECT_URI } from '$env/static/private';
import { SessionState, type SlackSession } from '$lib/types/definitions';

export const GET: RequestHandler = async ({ request }) => {
	const url = new URL(request.url);

	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	if (code === null) {
		console.error('Code was null');
		return new Response('code was bogus amogus', { status: 400 });
	}
	if (state === null) {
		console.error('State was null');
		return new Response('state was missing', { status: 400 });
	}

	const [session_id, session_secret] = state.split('::');
	const entry_key = `slack_session:${session_id}`;
	const entry: SlackSession | null = await redis.get(entry_key);

	if (!entry || entry.session_secret !== session_secret) {
		return new Response('Invalid session', { status: 400 });
	}

	// Standard Slack OAuth flow, exchange `code` for user- and/bot tokens
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

	if (token_response.ok) {
		console.debug(token_response);
		// Store token
		const to_store: SlackSession = {
			status: SessionState.Successful,
			tokens: token_response
		};
		await redis.set(
			entry_key,
			to_store,
			{ ex: 60 } // tokens only need to live briefly
		);
		console.debug(`Storing in Redis:\n${JSON.stringify(to_store, null, 4)}`);

		// Replace with proper success page
		return new Response('Slack connected. You can close this window', {
			headers: { 'Content-Type': 'text/plain' }
		});
	} else {
		console.error('Error from slack redirect');
		return new Response(`Error fetching token: ${token_response.error}`, {
			status: 500
		});
	}
};
