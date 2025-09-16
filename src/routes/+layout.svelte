<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './under-construction.css';

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectSpeedInsights();

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
