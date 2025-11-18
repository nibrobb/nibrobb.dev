<script lang="ts">
	import favicon_light from '$lib/assets/favicon_light.png';
	import favicon_dark from '$lib/assets/favicon_dark.png';
	import './under-construction.css';
	import { onMount } from 'svelte';

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectSpeedInsights();

	let { children } = $props();

	let showCookieBanner = $state(false);
	let cookieName = 'acceptAnalyticsCookies';

	function declineCookies() {
		localStorage.setItem(cookieName, 'false');
		showCookieBanner = false;
	}
	function acceptCookies() {
		localStorage.setItem(cookieName, 'true');
		showCookieBanner = false;
		loadGtag();
	}

	function loadGtag() {
		if (typeof window === 'undefined') return;
		const tag = 'G-N4EFB5FV81';
		const gtagScriptSrc = `https://www.googletagmanager.com/gtag/js?id=${tag}`;
		const existingScript = document.querySelector(`script[src="${gtagScriptSrc}"]`);
		if (existingScript) return; // Prevent double loading
		const script = document.createElement('script');
		script.async = true;
		script.src = gtagScriptSrc;
		document.head.appendChild(script);
		script.onload = () => {
			window.dataLayer = window.dataLayer || [];
			window.gtag = function (_command, ...args) {
				window.dataLayer.push(args);
			};
			window.gtag('js', new Date());
			window.gtag('config', tag);
		};
	}

	onMount(() => {
		showCookieBanner = localStorage.getItem(cookieName) === null;
		if (localStorage.getItem(cookieName) === 'true') {
			loadGtag();
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon_light} media="(prefers-color-scheme: dark)" />
	<link rel="icon" href={favicon_dark} media="(prefers-color-scheme: light)" />
</svelte:head>

{@render children?.()}

{#if showCookieBanner}
	<div class="cookie-banner">
		<p>This site uses cookies for analytics.</p>
		<button class="cookie-decline cookie-button" onclick={declineCookies}>Decline</button>
		<button class="cookie-accept cookie-button" onclick={acceptCookies}>Accept</button>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
