import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
    redirect(307, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
};
