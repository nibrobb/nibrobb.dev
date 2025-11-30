<script lang="ts">
    import favicon_light from "$lib/assets/favicon_light.png";
    import favicon_dark from "$lib/assets/favicon_dark.png";
    import "./under-construction.css";
    import { onMount } from "svelte";
    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    import { PUBLIC_GTAG_ID } from "$env/static/public";

    injectSpeedInsights();

    let { children } = $props();

    let showCookieBanner = $state(false);
    const BANNER_STORAGE_NAME = "acceptAnalyticsCookies";

    function loadGtagAndConfig() {
        // 0. Preemptively send consent update
        gtag("consent", "update", {
            ad_user_data: "granted",
            ad_personalization: "granted",
            ad_storage: "granted",
            analytics_storage: "granted",
        });

        // 1. Load gtag.js script
        const gtagScript = document.createElement("script");
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GTAG_ID}`;
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode?.insertBefore(gtagScript, firstScript);

        // 2. Send the config command after the script is loaded
        gtag("js", new Date());
        gtag("config", PUBLIC_GTAG_ID);
    }

    function declineCookies() {
        localStorage.setItem(BANNER_STORAGE_NAME, "false");
        showCookieBanner = false;
    }
    function acceptCookies() {
        localStorage.setItem(BANNER_STORAGE_NAME, "true");
        showCookieBanner = false;

        loadGtagAndConfig();
    }

    onMount(() => {
        const bannerPreference = localStorage.getItem(BANNER_STORAGE_NAME);
        // Only show cookie banner if no choice has been made
        showCookieBanner = bannerPreference === null;
        const hasAccepted = bannerPreference === "true";
        if (hasAccepted) {
            // If consent was previously given, load the script and config
            loadGtagAndConfig();
        }
    });
</script>

<svelte:head>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }

        // Deny GA by default
        gtag("consent", "default", {
            ad_user_data: "denied",
            ad_personalization: "denied",
            ad_storage: "denied",
            analytics_storage: "denied",
            wait_for_update: 500,
        });
    </script>
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
