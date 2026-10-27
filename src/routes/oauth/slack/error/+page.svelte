<script lang="ts">
    import { page } from "$app/state";
    import Seo from "#lib/components/Seo.svelte";

    const reason = $derived(page.url.searchParams.get("reason") ?? "unknown_error");
</script>

<Seo
    title="Slack Connection Failed | Luxafor-ui"
    description="Connecting Luxafor-ui to Slack failed."
    path="/oauth/slack/error"
/>

<main>
    <div class="construction-container oauth-container oauth-error-container">
        <div class="construction-content oauth-content">
            <div class="worker-icon">❌</div>
            <h1>Slack Connection Failed</h1>
            <p>We could not finish the OAuth flow. Please try again.</p>
            <p class="oauth-note">Reason: <code>{reason}</code></p>
            <a class="oauth-cta" href="/luxafor-ui">Back to Luxafor-ui</a>
        </div>
    </div>
</main>
