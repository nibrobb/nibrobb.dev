import { redis } from '$lib/server/redis';
import type { RequestHandler } from './$types';
import { SessionState, type SlackSession } from '$lib/types/definitions';
import { HttpStatusCode } from 'axios';

// Poll for tokens
export const GET: RequestHandler = async ({ url }) => {
	const session_id = url.searchParams.get('session_id');
	const session_secret = url.searchParams.get('session_secret');

	if (!session_id || !session_secret) {
		console.warn('[Slack Session Status] session_id or session_secret was not provided');
		return Response.json(
			{ status: SessionState.Error, detail: 'session_id or session_secret was not provided' },
			{ status: HttpStatusCode.BadRequest }
		);
	}

	const entry_key = `slack_session:${session_id}`;
	console.debug(`Polling with entry_key: ${entry_key}`);
	console.debug(`session_secret: ${session_secret}`);

	const entry: SlackSession | null = await redis.get(entry_key);

	if (!entry) {
		return Response.json({ status: SessionState.Invalid }, { status: HttpStatusCode.NotFound });
	}

	if (entry.session_secret && entry.session_secret !== session_secret) {
		return Response.json({ status: SessionState.Pending }, { status: HttpStatusCode.Forbidden });
	}

	if (entry.status === SessionState.Pending) {
		return Response.json({ status: entry.status }, { status: HttpStatusCode.Accepted });
	}

	if (entry.status === SessionState.Ok) {
		// await redis.del(entry_key);
		return Response.json({ status: entry.status, tokens: entry.tokens });
	}

	return Response.json({ status: SessionState.Error });
};
