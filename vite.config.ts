import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        sveltekit({
            // Consult https://svelte.dev/docs/kit/integrations
            // for more information about preprocessors
            preprocess: vitePreprocess(),
            adapter: adapter(),
        }),
    ],
    server: {
        allowedHosts:
            process.env.ALLOW_ALL_HOSTS === "true"
                ? true
                : ["localhost", "127.0.0.1", "[::1]"],
    },
});
