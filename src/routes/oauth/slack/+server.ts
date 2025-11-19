import type { RequestHandler } from './$types';
import 'dotenv/config';
import { redirect } from '@sveltejs/kit';
import { SLACK_CLIENT_ID, SLACK_REDIRECT_URI } from '$env/static/private';

export const GET: RequestHandler = async ({ request }) => {
	const url = new URL(request.url);
	const session_id = url.searchParams.get('session_id');
	const session_secret = url.searchParams.get('session_secret');

	const state = `${session_id}::${session_secret}`;

	const user_scopes = ['users.profile:read', 'users.profile:write'];
	const user_scopes_string = user_scopes.join(',');

	const redirect_url = new URL('https://slack.com/oauth/v2/authorize');
	redirect_url.searchParams.set('client_id', SLACK_CLIENT_ID);
	redirect_url.searchParams.set('user_scope', user_scopes_string);
	redirect_url.searchParams.set('redirect_uri', SLACK_REDIRECT_URI);
	redirect_url.searchParams.set('state', state);

	console.log(`Redirecting to: ${redirect_url}`);
	// Redirect the user to slack for authorization,
	// Slack will upon approval of the app,
	// redirect back to our /oauth/slack/callback function
	redirect(302, redirect_url);
};
