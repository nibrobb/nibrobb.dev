import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['.nibrobb.dev', 'be2e8a2810e4.ngrok-free.app']
	}
});
