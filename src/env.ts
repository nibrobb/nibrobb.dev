import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    GITHUB_TOKEN: { static: true },
    PUBLIC_GTAG_ID: { public: true, static: true },
    SLACK_CLIENT_ID: { static: true },
    PUBLIC_SLACK_REDIRECT_URI: { public: true, static: true },
    SLACK_CLIENT_SECRET: { static: true },
    PUBLIC_BASE_DOMAIN: { public: true, static: true },
});
