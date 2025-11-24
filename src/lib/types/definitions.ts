export enum SessionState {
	Pending = 'pending',
	Ok = 'ok',
	Invalid = 'invalid',
	Error = 'error'
}
export type SlackUserToken = string;
export type SlackBotToken = string;
export type SlackTokens = {
	user_token?: SlackUserToken;
	bot_token?: SlackBotToken;
};
export type SlackSession = {
	status: SessionState;
	session_secret?: string;
	tokens?: SlackTokens;
};
