import adapterNode from "@sveltejs/adapter-node";
import adapterVercel from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        sveltekit({
            // Consult https://svelte.dev/docs/kit/integrations
            // for more information about preprocessors
            preprocess: vitePreprocess(),
            // ADAPTER=node is set by the Dockerfile; Vercel builds use the default
            adapter: process.env.ADAPTER === "node" ? adapterNode() : adapterVercel(),
        }),
    ],
    server: {
        allowedHosts:
            process.env.ALLOW_ALL_HOSTS === "true" ? true : ["localhost", "127.0.0.1", "[::1]"],
    },
});
