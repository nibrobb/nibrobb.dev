import { redis } from '$lib/server/redis';
import type { RequestHandler } from './$types';
import { SessionState, type SlackSession } from '$lib/types/definitions';

export const GET: RequestHandler = async ({ request }) => {
	const url = new URL(request.url);
	const session_id = url.searchParams.get('session_id');
	const session_secret = url.searchParams.get('session_secret');

	const entry_key = `slack_session:${session_id}`;
	console.debug(`Polling with entry_key: ${entry_key}`);
	console.debug(`session_secret: ${session_secret}`);

	const entry: SlackSession | null = await redis.get(entry_key);

	if (!entry) {
		return Response.json({ status: SessionState.Invalid });
	}

	if (entry.session_secret && entry.session_secret !== session_secret) {
		return Response.json({ status: SessionState.Pending });
	}

	if (entry?.status === SessionState.Pending) {
		return Response.json({ status: entry.status });
	}

	if (entry?.status === SessionState.Ok) {
		// await redis.del(entry_key);
		return Response.json({ status: entry.status, tokens: entry.tokens });
	}

	return Response.json({ status: SessionState.Error });
};
