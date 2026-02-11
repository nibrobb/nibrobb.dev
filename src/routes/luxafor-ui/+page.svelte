<script lang="ts">
    import { resolve } from "$app/paths";

    // import type { PageProps } from './$types';
    // let { data }: PageProps = $props();
</script>

<svelte:head>
    <link rel="canonical" href="https://www.nibrobb.dev/luxafor-ui" />
    <meta
        property="og:image"
        content="https://raw.githubusercontent.com/nibrobb/luxafor-ui/refs/heads/slack-integration/public/gui.png"
    />
    <meta
        property="og:image:alt"
        content="A Windows® application with eight vertically arranged buttons in different colors; the penultimate button glows bright green, mirroring the lamp's current setting."
    />
    <meta property="og:title" content="Luxafor-ui" />
    <meta property="og:url" content="https://www.nibrobb.dev/luxafor-ui" />
    <meta property="og:description" content="Luxafor-ui is a dashboard for your Luxafor FLAG™" />
    <meta property="og:locale" content="en_US" />
</svelte:head>

<main>
    <style>
        :root {
            background-color: #181818;
        }
        .heading-text {
            color: white;
        }
        .luxafor-ui-content {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: center;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }
    </style>

    <div class="luxafor-ui-content">
        <h1 class="heading-text">Luxafor-ui</h1>
        <a href={resolve(`/oauth/slack`)}>
            <img
                style="margin: 20px"
                alt="Add to Slack"
                height="40"
                width="139"
                src="https://platform.slack-edge.com/img/add_to_slack.png"
                srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
        </a>
        <img
            src="https://raw.githubusercontent.com/nibrobb/luxafor-ui/refs/heads/slack-integration/public/gui.png"
            alt="Illustration of the Luxafor-ui app"
        />
    </div>
</main>
