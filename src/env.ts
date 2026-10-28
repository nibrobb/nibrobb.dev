import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    GITHUB_TOKEN: {},
    PUBLIC_GTAG_ID: { public: true, static: true },
    SLACK_CLIENT_ID: {},
    PUBLIC_SLACK_REDIRECT_URI: { public: true, static: true },
    SLACK_CLIENT_SECRET: {},
    PUBLIC_BASE_DOMAIN: { public: true, static: true },
});
