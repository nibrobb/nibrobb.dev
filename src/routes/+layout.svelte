<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './under-construction.css';

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectSpeedInsights();

	let { children } = $props();

	let showCookieBanner = $state(false);

	if (typeof window !== 'undefined') {
		showCookieBanner = localStorage.getItem('acceptAnalyticsCookies') !== 'true';
	}

	function acceptCookies() {
		localStorage.setItem('acceptAnalyticsCookies', 'true');
		showCookieBanner = false;
		loadGtag();
	}

	function loadGtag() {
		if (typeof window === 'undefined') return;
		if (window.gtag) return; // Prevent double loading
		const script = document.createElement('script');
		script.async = true;
		script.src = 'https://www.googletagmanager.com/gtag/js?id=G-N4EFB5FV81';
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

	if (typeof window !== 'undefined' && localStorage.getItem('acceptAnalyticsCookies') === 'true') {
		loadGtag();
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

{#if showCookieBanner}
	<div class="cookie-banner">
		<p>This site uses cookies for analytics. By continuing, you accept this.</p>
		<button class="cookie-accept" onclick={acceptCookies}>Accept</button>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
