import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    GITHUB_TOKEN: {},
    PUBLIC_GTAG_ID: { public: true, static: true },
    SLACK_CLIENT_ID: {},
    SLACK_CLIENT_SECRET: {},
    SLACK_REDIRECT_URI: {},
    BASE_DOMAIN: {},
});
