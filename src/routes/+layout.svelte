<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './under-construction.css';

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectSpeedInsights();

	let { children } = $props();

	let showCookieBanner = $state(false);
	let cookieName = 'acceptAnalyticsCookies';

	if (typeof window !== 'undefined') {
		// Only show banner if cookie is not set
		showCookieBanner = localStorage.getItem(cookieName) === null;
	}
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
		const gtagScriptSrc = 'https://www.googletagmanager.com/gtag/js?id=G-N4EFB5FV81';
		const existingScript = document.querySelector(`script[src="${gtagScriptSrc}"]`)
		if (window.gtag || existingScript) return; // Prevent double loading
		const script = document.createElement('script');
		script.async = true;
		script.src = gtagScriptSrc;
		document.head.appendChild(script);
		script.onload = () => {
			window.dataLayer = window.dataLayer || [];
			window.gtag = function () {
				window.dataLayer.push(arguments);
			};
			window.gtag('js', new Date());
			window.gtag('config', 'G-N4EFB5FV81');
		};
	}

	if (typeof window !== 'undefined' && localStorage.getItem(cookieName) === 'true') {
		loadGtag();
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

{#if showCookieBanner}
	<div class="cookie-banner">
		<p>This site uses cookies for analytics.</p>
		<button class="cookie-decline" onclick={declineCookies}>Decline</button>
		<button class="cookie-accept" onclick={acceptCookies}>Accept</button>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
