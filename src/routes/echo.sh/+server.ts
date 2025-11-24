import type { RequestHandler } from "./$types";
import echo_sh from "$lib/files/echo.sh?raw";

export const GET: RequestHandler = async () => {
    return new Response(echo_sh, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
