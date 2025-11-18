import type { RequestHandler } from './$types';
import 'dotenv/config';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const user_scopes = ['users.profile:read', 'users.profile:write'];
	const user_scopes_string = user_scopes.join(',');
	// Redirect the user to slack for authorization,
	// Slack will upon approval of the app,
	// redirect back to our /oauth/slack/callback function
	redirect(
		307,
		`https://slack.com/oauth/v2/authorize?client_id=${
			process.env.SLACK_CLIENT_ID
		}&user_scope=${encodeURIComponent(user_scopes_string)}&redirect_uri=${encodeURIComponent(
			process.env.SLACK_REDIRECT_URI || ''
		)}`
	);
};
