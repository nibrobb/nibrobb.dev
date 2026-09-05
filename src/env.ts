import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    GITHUB_TOKEN: {
        static: true,
        description:
            "GitHub Personal Access token without scopes (only read public metadata)",
    },
    PUBLIC_GTAG_ID: {
        public: true,
        static: true,
        description: "Google Analytics Tag",
    },
    SLACK_CLIENT_ID: {
        static: true,
        description: "Client ID of the Slack App Luxafor-ui",
    },
    PUBLIC_SLACK_REDIRECT_URI: {
        public: true,
        static: true,
        description: "Redirect URI for the Slack App Luxafor-ui",
    },
    SLACK_CLIENT_SECRET: {
        static: true,
        description: "Client Secret for the Slack App Luxafor-ui",
    },
});
