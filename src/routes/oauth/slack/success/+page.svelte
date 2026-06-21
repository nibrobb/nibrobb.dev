<script lang="ts">
    import { onMount } from "svelte";

    let deepLink = "";
    let hasTokens = false;

    onMount(() => {
        const hash = window.location.hash.startsWith("#")
            ? window.location.hash.slice(1)
            : window.location.hash;
        const hashParams = new URLSearchParams(hash);
        const userToken = hashParams.get("user_token");
        const botToken = hashParams.get("bot_token");

        if (!userToken || !botToken) {
            return;
        }

        // Remove OAuth tokens from the URL ASAP so other scripts can't read them.
        history.replaceState(null, "", window.location.pathname + window.location.search);

        const deepLinkUrl = new URL("luxafor-ui://auth");

        deepLink = deepLinkUrl.toString();
        hasTokens = true;

        // Hand off to the desktop app quickly while still showing a manual fallback button.
        setTimeout(() => {
            window.location.assign(deepLinkUrl.toString());
        }, 250);
    });
</script>

<svelte:head>
    <title>Slack Connected | Luxafor-ui</title>
</svelte:head>

<main>
    <div class="construction-container oauth-container">
        <div class="construction-content oauth-content">
            <div class="worker-icon">✅</div>
            <h1>Slack Connected</h1>
            <p>Your workspace is authorized. We are opening Luxafor-ui now.</p>

            {#if hasTokens}
                <a class="oauth-cta" rel="external" href={deepLink}>Open Luxafor-ui manually</a>
            {:else}
                <p class="oauth-note">
                    OAuth tokens were not found. Please retry from the
                    <a href="/luxafor-ui">Luxafor-ui page</a>.
                </p>
            {/if}
        </div>
    </div>
</main>
