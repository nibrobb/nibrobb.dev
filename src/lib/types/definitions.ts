export enum SessionState {
	Pending = 'pending',
	Successful = 'done'
}

export type SlackUserToken = string | undefined;
export type SlackBotToken = string | undefined;

export interface SlackTokens {
	user_token?: SlackUserToken;
	bot_token?: SlackBotToken;
}

export interface SlackSession {
	status: SessionState;
	session_secret?: string;
	tokens?: SlackTokens;
}
