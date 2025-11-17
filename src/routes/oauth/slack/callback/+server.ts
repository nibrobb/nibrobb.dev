import axios from 'axios';
import type { RequestHandler } from './$types';

export const config = {
    runtime: "edge"
};

export const GET: RequestHandler = async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    if (code === null) {
        console.error("Got null as code");
        return new Response("code was bogus amogus", { status: 500 });
    }

    try {
        const token_response = await axios.post("https://slack.com/api/oauth.v2.access",
            null,
            {
                params: {
                    code,
                    client_id: process.env.SLACK_CLIENT_ID,
                    client_secret: process.env.SLACK_CLIENT_SECRET,
                    redirect_uri: process.env.SLACK_REDIRECT_URI,
                }
            }
        );

        if (token_response.data.ok) {
            const data = token_response.data;
            // const access_token = data.authed_user.access_token;
            // TODO: Redirect to an /installed page with info on how to proceed
            // For now just dump the data
            return new Response(
                `Insert the user and bot tokens in your \`settings.json\`:\n${JSON.stringify(data, null, 4)}`
            );
        } else {
            console.error("Error from slack redirect");
            return new Response(`Error fetching token: ${token_response.data.error}`, {
                status: 500
            });
        }
    } catch (error) {
        console.error(error);
        return new Response("Error fetching token", {
            status: 500
        });
    }
};