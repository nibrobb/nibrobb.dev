import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        allowedHosts:
            process.env.ALLOW_ALL_HOSTS === "true"
                ? true
                : ["localhost", "127.0.0.1", "[::1]"],
    },
});
